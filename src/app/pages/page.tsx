import Link from 'next/link';
import { Suspense } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';
import Pagination from '../components/Pagination';
import { getPages } from '../services/wordpress';

export const dynamic = 'force-dynamic';

async function PagesList({ page = 1 }: { page?: number }) {
  try {
    const { pages, totalPages } = await getPages(page);
    
    if (pages.length === 0) {
      return <p className="text-center text-gray-600">No pages found.</p>;
    }
    
    return (
      <>
        <div className="space-y-4">
          {pages.map((page) => (
            <Link 
              href={`/pages/${page.slug}`} 
              key={page.id}
              className="block bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-600">
                  <span dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
                </h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {new Date(page.date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8">
          <Pagination currentPage={page} totalPages={totalPages} basePath="/pages" />
        </div>
      </>
    );
  } catch (error) {
    return <ErrorDisplay message="Failed to load pages. Please try again later." />;
  }
}

export default async function PagesPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  return (
    <Layout title="Pages - WordPress Next.js App">
      <h1 className="text-3xl font-bold mb-6">WordPress Pages</h1>
      <Suspense fallback={<Loading />}>
        <PagesList page={page} />
      </Suspense>
    </Layout>
  );
}