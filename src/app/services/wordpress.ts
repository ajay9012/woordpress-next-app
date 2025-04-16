// Base URL for the WordPress API
const API_URL = 'https://demo.modifyed.xyz/wp-json/wp/v2';

// Types for WordPress data
export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  slug: string;
  link: string;
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  slug: string;
  link: string;
}

// Fetch posts
export async function getPosts(page = 1, perPage = 10) {
  try {
    const response = await fetch(
      `${API_URL}/posts?page=${page}&per_page=${perPage}`
    );
    
    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts: WordPressPost[] = await response.json();
    
    // Get the total number of pages from the headers
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    
    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const posts: WordPressPost[] = await response.json();
    return posts[0]; // Return the first post that matches the slug
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

// Fetch pages
export async function getPages(page = 1, perPage = 10) {
  try {
    const response = await fetch(
      `${API_URL}/pages?page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }
    
    const pages: WordPressPage[] = await response.json();
    
    // Get the total number of pages from the headers
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    
    return { pages, totalPages };
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/pages?slug=${slug}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }
    
    const pages: WordPressPage[] = await response.json();
    return pages[0]; // Return the first page that matches the slug
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    throw error;
  }
}