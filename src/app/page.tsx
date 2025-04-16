import Link from 'next/link';
import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout title="Home - WordPress Next.js App">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-6">WordPress Next.js App</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          A simple application that fetches and displays posts and pages from a WordPress site.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Posts</h2>
            <p className="text-gray-600 mb-6">View all blog posts from the WordPress site.</p>
            <Link href="/posts" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              View Posts
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Pages</h2>
            <p className="text-gray-600 mb-6">View all pages from the WordPress site.</p>
            <Link href="/pages" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              View Pages
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}