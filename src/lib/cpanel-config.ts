// cPanel API Configuration
// Update these values with your actual cPanel API credentials

export const CPANEL_CONFIG = {
  // Your cPanel domain (replace with your actual domain)
  API_BASE_URL: process.env.CPANEL_API_URL || 'https://your-domain.com/api',
  
  // Your cPanel API key/token
  API_KEY: process.env.CPANEL_API_KEY || 'your-api-key-here',
  
  // Database configuration (if using MySQL/MariaDB)
  DATABASE: {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'blueberries_films',
    user: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
  },
  
  // File upload settings
  UPLOAD: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'],
    uploadPath: '/public_html/uploads/',
  },
  
  // API Endpoints (these should match your cPanel backend)
  ENDPOINTS: {
    videos: '/videos',
    movies: '/movies',
    tvshows: '/tvshows',
    livetv: '/livetv',
    blogs: '/blogs',
    users: '/users',
    categories: '/categories',
    upload: '/upload',
  },
  
  // Authentication settings
  AUTH: {
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

// Helper function to get API URL
export function getApiUrl(endpoint: string): string {
  return `${CPANEL_CONFIG.API_BASE_URL}${endpoint}`;
}

// Helper function to get headers with authentication
export function getAuthHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${CPANEL_CONFIG.API_KEY}`,
    'Content-Type': 'application/json',
  };
}

// Environment variables that need to be set in your .env.local file:
/*
CPANEL_API_URL=https://your-domain.com/api
CPANEL_API_KEY=your-actual-api-key
DB_HOST=localhost
DB_NAME=blueberries_films
DB_USER=your_db_user
DB_PASSWORD=your_db_password
*/ 