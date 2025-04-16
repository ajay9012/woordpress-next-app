import Link from 'next/link';
import { Suspense } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';
import Pagination from '../components/Pagination';
import { getPosts } from '../services/wordpress';

export const dynamic = 'force-dynamic';

async function PostsList({ page = 1 }: { page?: number }) {
  try {
    const { posts, totalPages } = await getPosts(page);
    
    if (posts.length === 0) {
      return <p className="text-center text-gray-600">No posts found.</p>;
    }
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  <Link href={`/posts/${post.slug}`} className="text-indigo-600 hover:text-indigo-800 hover:underline">
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </Link>
                </h3>
                <div 
                  className="text-gray-600 prose prose-sm max-w-none" 
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <p className="text-sm text-gray-500">
                  Published on {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
        </div>
      </>
    );
  } catch (error) {
    return <ErrorDisplay message="Failed to load posts. Please try again later." />;
  }
}

export default async function PostsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  return (
    <Layout title="Posts - WordPress Next.js App">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<Loading />}>
        <PostsList page={page} />
      </Suspense>
    </Layout>
  );
}