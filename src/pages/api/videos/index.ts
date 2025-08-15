import type { NextApiRequest, NextApiResponse } from 'next';

let videos: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(videos);
  } else if (req.method === 'POST') {
    const video = { id: Date.now().toString(), ...req.body };
    videos.push(video);
    res.status(201).json(video);
  } else {
    res.status(405).end();
  }
} 