import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <nav className="flex justify-center mt-6" aria-label="Page navigation">
      <ul className="inline-flex space-x-2">
        {/* Previous button */}
        <li>
          <Link 
            href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : '#'} 
            className={`px-3 py-2 rounded-md ${
              currentPage <= 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-white text-indigo-600 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label="Previous"
            aria-disabled={currentPage <= 1}
          >
            &laquo;
          </Link>
        </li>
        
        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <Link 
              href={`${basePath}?page=${page}`}
              className={`px-3 py-2 rounded-md ${
                page === currentPage
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <Link 
            href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : '#'}
            className={`px-3 py-2 rounded-md ${
              currentPage >= totalPages 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-white text-indigo-600 border border-gray-300 hover:bg-gray-50'
            }`} 
            aria-label="Next"
            aria-disabled={currentPage >= totalPages}
          >
            &raquo;
          </Link>
        </li>
      </ul>
    </nav>
  );
}