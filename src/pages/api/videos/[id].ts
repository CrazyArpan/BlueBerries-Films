import type { NextApiRequest, NextApiResponse } from 'next';

let videos: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const video = videos.find(v => v.id === id);
    res.status(200).json(video);
  } else if (req.method === 'PUT') {
    const idx = videos.findIndex(v => v.id === id);
    if (idx !== -1) {
      videos[idx] = { ...videos[idx], ...req.body };
      res.status(200).json(videos[idx]);
    } else {
      res.status(404).end();
    }
  } else if (req.method === 'DELETE') {
    videos = videos.filter(v => v.id !== id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
} 