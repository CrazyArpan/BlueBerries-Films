import type { NextApiRequest, NextApiResponse } from 'next';

interface Movie {
  id?: number;
  title: string;
  description: string;
  genre: string;
  duration: string;
  releaseYear: string;
  director: string;
  cast: string;
  posterUrl: string;
  videoUrl: string;
  trailerUrl?: string;
  rating?: string;
  language: string;
  subtitles?: string;
  isFeatured: boolean;
  isPublished: boolean;
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
        // Fetch all movies
        const response = await fetch(`${API_BASE_URL}/movies`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const movies = await response.json();
        res.status(200).json(movies);
        break;

      case 'POST':
        // Create new movie
        const movieData: Movie = req.body;
        
        const createResponse = await fetch(`${API_BASE_URL}/movies`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        });
        
        if (!createResponse.ok) {
          throw new Error(`HTTP error! status: ${createResponse.status}`);
        }
        
        const newMovie = await createResponse.json();
        res.status(201).json(newMovie);
        break;

      case 'PUT':
        // Update movie
        const { id, ...updateData } = req.body;
        
        const updateResponse = await fetch(`${API_BASE_URL}/movies/${id}`, {
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
        
        const updatedMovie = await updateResponse.json();
        res.status(200).json(updatedMovie);
        break;

      case 'DELETE':
        // Delete movie
        const { id: deleteId } = req.query;
        
        const deleteResponse = await fetch(`${API_BASE_URL}/movies/${deleteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }
        
        res.status(200).json({ message: 'Movie deleted successfully' });
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