import type { NextApiRequest, NextApiResponse } from 'next';

let blogs: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(blogs);
  } else if (req.method === 'POST') {
    const blog = { id: Date.now().toString(), ...req.body };
    blogs.push(blog);
    res.status(201).json(blog);
  } else {
    res.status(405).end();
  }
} 