import type { NextApiRequest, NextApiResponse } from 'next';

interface User {
  id?: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  password?: string;
  avatar?: string;
  subscription?: string;
  registeredAt?: string;
  lastLogin?: string;
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
        // Fetch all users
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        res.status(200).json(users);
        break;

      case 'POST':
        // Create new user
        const userData: User = req.body;
        
        const createResponse = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        if (!createResponse.ok) {
          throw new Error(`HTTP error! status: ${createResponse.status}`);
        }
        
        const newUser = await createResponse.json();
        res.status(201).json(newUser);
        break;

      case 'PUT':
        // Update user
        const { id, ...updateData } = req.body;
        
        const updateResponse = await fetch(`${API_BASE_URL}/users/${id}`, {
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
        
        const updatedUser = await updateResponse.json();
        res.status(200).json(updatedUser);
        break;

      case 'DELETE':
        // Delete user
        const { id: deleteId } = req.query;
        
        const deleteResponse = await fetch(`${API_BASE_URL}/users/${deleteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
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