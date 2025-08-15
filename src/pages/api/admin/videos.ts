import type { NextApiRequest, NextApiResponse } from 'next';

interface Video {
  id?: number;
  title: string;
  description: string;
  type: 'movie' | 'tvshow' | 'livetv' | 'minute4film' | 'musicvideo';
  genre: string;
  duration: string;
  releaseYear: string;
  director: string;
  cast: string;
  posterUrl: string;
  videoUrl: string;
  trailerUrl?: string;
  thumbnailUrl?: string;
  rating?: string;
  language: string;
  subtitles?: string;
  quality: 'HD' | '4K' | 'SD';
  isFeatured: boolean;
  isPublished: boolean;
  views?: number;
  likes?: number;
  category: string;
  tags: string[];
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
        // Fetch all videos with optional type filter
        const { type } = req.query;
        const url = type ? `${API_BASE_URL}/videos?type=${type}` : `${API_BASE_URL}/videos`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const videos = await response.json();
        res.status(200).json(videos);
        break;

      case 'POST':
        // Create new video
        const videoData: Video = req.body;
        
        const createResponse = await fetch(`${API_BASE_URL}/videos`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoData),
        });
        
        if (!createResponse.ok) {
          throw new Error(`HTTP error! status: ${createResponse.status}`);
        }
        
        const newVideo = await createResponse.json();
        res.status(201).json(newVideo);
        break;

      case 'PUT':
        // Update video
        const { id, ...updateData } = req.body;
        
        const updateResponse = await fetch(`${API_BASE_URL}/videos/${id}`, {
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
        
        const updatedVideo = await updateResponse.json();
        res.status(200).json(updatedVideo);
        break;

      case 'DELETE':
        // Delete video
        const { id: deleteId } = req.query;
        
        const deleteResponse = await fetch(`${API_BASE_URL}/videos/${deleteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }
        
        res.status(200).json({ message: 'Video deleted successfully' });
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