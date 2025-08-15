import type { NextApiRequest, NextApiResponse } from 'next';

let blogs: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const blog = blogs.find(b => b.id === id);
    res.status(200).json(blog);
  } else if (req.method === 'PUT') {
    const idx = blogs.findIndex(b => b.id === id);
    if (idx !== -1) {
      blogs[idx] = { ...blogs[idx], ...req.body };
      res.status(200).json(blogs[idx]);
    } else {
      res.status(404).end();
    }
  } else if (req.method === 'DELETE') {
    blogs = blogs.filter(b => b.id !== id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
} 