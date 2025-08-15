import type { NextApiRequest, NextApiResponse } from 'next';

interface BlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  featuredImage: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Replace with your cPanel API endpoint
  const API_BASE_URL = process.env.CPANEL_API_URL || 'https://your-domain.com/api';
  const API_KEY = process.env.CPANEL_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    switch (method) {
      case 'GET':
        // Fetch all blog posts
        const response = await fetch(`${API_BASE_URL}/blogs`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogs = await response.json();
        res.status(200).json(blogs);
        break;

      case 'POST':
        // Create new blog post
        const blogData: BlogPost = req.body;
        
        const createResponse = await fetch(`${API_BASE_URL}/blogs`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        });
        
        if (!createResponse.ok) {
          throw new Error(`HTTP error! status: ${createResponse.status}`);
        }
        
        const newBlog = await createResponse.json();
        res.status(201).json(newBlog);
        break;

      case 'PUT':
        // Update blog post
        const { id, ...updateData } = req.body;
        
        const updateResponse = await fetch(`${API_BASE_URL}/blogs/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });
        
        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }
        
        const updatedBlog = await updateResponse.json();
        res.status(200).json(updatedBlog);
        break;

      case 'DELETE':
        // Delete blog post
        const { id: deleteId } = req.query;
        
        const deleteResponse = await fetch(`${API_BASE_URL}/blogs/${deleteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }
        
        res.status(200).json({ message: 'Blog post deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 