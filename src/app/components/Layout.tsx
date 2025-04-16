import { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'WordPress Next.js App' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="WordPress content displayed with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <nav className="bg-indigo-600 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <Link href="/" className="flex items-center py-5 px-2 text-white font-bold">
                  WordPress Next.js
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/" className="py-5 px-3 text-white hover:text-indigo-200">
                  Home
                </Link>
                <Link href="/posts" className="py-5 px-3 text-white hover:text-indigo-200">
                  Posts
                </Link>
                <Link href="/pages" className="py-5 px-3 text-white hover:text-indigo-200">
                  Pages
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button outline-none">
                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" 
                    strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="mobile-menu hidden md:hidden">
          <Link href="/" className="block py-2 px-4 text-sm text-white hover:bg-indigo-700">Home</Link>
          <Link href="/posts" className="block py-2 px-4 text-sm text-white hover:bg-indigo-700">Posts</Link>
          <Link href="/pages" className="block py-2 px-4 text-sm text-white hover:bg-indigo-700">Pages</Link>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-gray-100 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">© 2025 WordPress Next.js App</p>
        </div>
      </footer>
    </>
  );
}