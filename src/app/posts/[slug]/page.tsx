import { Suspense } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ErrorDisplay from '../../components/ErrorDisplay';

import { getPostBySlug } from '../../services/wordpress';

export const dynamic = 'force-dynamic';

async function PostContent({ slug }: { slug: string }) {
  try {
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return <ErrorDisplay message={`Post "${slug}" not found.`} />;
    }
    
    return (
      <article className="bg-white rounded-lg shadow-md p-6">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <p className="text-gray-500">
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
        </header>
        
        <div 
          className="prose prose-indigo max-w-none" 
          dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        />
        
        <div className="mt-8">
          <Link 
            href="/posts" 
            className="inline-flex items-center bg-white text-indigo-600 px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </article>
    );
  } catch (error) {
    return <ErrorDisplay message="Failed to load the post. Please try again later." />;
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <Layout title={`Post - WordPress Next.js App`}>
      <Suspense fallback={<Loading />}>
        <PostContent slug={params.slug} />
      </Suspense>
    </Layout>
  );
}