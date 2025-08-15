# cPanel Backend Setup Guide for BlueBerries Films Admin Panel

This guide will help you set up the backend API endpoints in cPanel to work with the admin panel.

## 📋 Prerequisites

- cPanel hosting account
- MySQL/MariaDB database access
- PHP support (7.4 or higher recommended)
- File Manager access

## 🗄️ Database Setup

### 1. Create Database Tables

Create these tables in your cPanel MySQL database:

```sql
-- Videos/Movies Table
CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('movie', 'tvshow', 'livetv', 'minute4film', 'musicvideo') NOT NULL,
    genre VARCHAR(100),
    duration VARCHAR(50),
    release_year VARCHAR(4),
    director VARCHAR(255),
    cast TEXT,
    poster_url VARCHAR(500),
    video_url VARCHAR(500) NOT NULL,
    trailer_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    rating VARCHAR(10),
    language VARCHAR(50),
    subtitles VARCHAR(100),
    quality ENUM('SD', 'HD', '4K') DEFAULT 'HD',
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    category VARCHAR(100),
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT,
    excerpt TEXT,
    author VARCHAR(255),
    featured_image VARCHAR(500),
    tags JSON,
    category VARCHAR(100),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    publish_date DATE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'moderator') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    avatar VARCHAR(500),
    subscription VARCHAR(100),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

## 🔧 API Backend Setup

### 1. Create API Directory Structure

In your cPanel File Manager, create this structure:
```
public_html/
├── api/
│   ├── config/
│   │   └── database.php
│   ├── videos/
│   │   ├── index.php
│   │   └── [id].php
│   ├── blogs/
│   │   ├── index.php
│   │   └── [id].php
│   ├── users/
│   │   ├── index.php
│   │   └── [id].php
│   ├── categories/
│   │   ├── index.php
│   │   └── [id].php
│   ├── upload/
│   │   └── index.php
│   └── auth/
│       └── login.php
└── uploads/
    ├── videos/
    ├── images/
    └── thumbnails/
```

### 2. Database Configuration

Create `public_html/api/config/database.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

class Database {
    private $host = 'localhost';
    private $db_name = 'your_database_name';
    private $username = 'your_username';
    private $password = 'your_password';
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
```

### 3. Videos API Endpoint

Create `public_html/api/videos/index.php`:

```php
<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all videos
        $query = "SELECT * FROM videos ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($videos);
        break;
        
    case 'POST':
        // Create new video
        $data = json_decode(file_get_contents("php://input"), true);
        
        $query = "INSERT INTO videos (title, description, type, genre, duration, release_year, director, cast, poster_url, video_url, trailer_url, rating, language, quality, is_featured, is_published, category, tags) 
                  VALUES (:title, :description, :type, :genre, :duration, :release_year, :director, :cast, :poster_url, :video_url, :trailer_url, :rating, :language, :quality, :is_featured, :is_published, :category, :tags)";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':type', $data['type']);
        $stmt->bindParam(':genre', $data['genre']);
        $stmt->bindParam(':duration', $data['duration']);
        $stmt->bindParam(':release_year', $data['releaseYear']);
        $stmt->bindParam(':director', $data['director']);
        $stmt->bindParam(':cast', $data['cast']);
        $stmt->bindParam(':poster_url', $data['posterUrl']);
        $stmt->bindParam(':video_url', $data['videoUrl']);
        $stmt->bindParam(':trailer_url', $data['trailerUrl']);
        $stmt->bindParam(':rating', $data['rating']);
        $stmt->bindParam(':language', $data['language']);
        $stmt->bindParam(':quality', $data['quality']);
        $stmt->bindParam(':is_featured', $data['isFeatured']);
        $stmt->bindParam(':is_published', $data['isPublished']);
        $stmt->bindParam(':category', $data['category']);
        $stmt->bindParam(':tags', json_encode($data['tags']));
        
        if($stmt->execute()) {
            $data['id'] = $db->lastInsertId();
            echo json_encode($data);
        } else {
            echo json_encode(['error' => 'Failed to create video']);
        }
        break;
}
?>
```

### 4. Blogs API Endpoint

Create `public_html/api/blogs/index.php`:

```php
<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all blogs
        $query = "SELECT * FROM blogs ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($blogs);
        break;
        
    case 'POST':
        // Create new blog
        $data = json_decode(file_get_contents("php://input"), true);
        
        $query = "INSERT INTO blogs (title, content, excerpt, author, featured_image, tags, category, status, publish_date, seo_title, seo_description, seo_keywords) 
                  VALUES (:title, :content, :excerpt, :author, :featured_image, :tags, :category, :status, :publish_date, :seo_title, :seo_description, :seo_keywords)";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':content', $data['content']);
        $stmt->bindParam(':excerpt', $data['excerpt']);
        $stmt->bindParam(':author', $data['author']);
        $stmt->bindParam(':featured_image', $data['featuredImage']);
        $stmt->bindParam(':tags', json_encode($data['tags']));
        $stmt->bindParam(':category', $data['category']);
        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':publish_date', $data['publishDate']);
        $stmt->bindParam(':seo_title', $data['seoTitle']);
        $stmt->bindParam(':seo_description', $data['seoDescription']);
        $stmt->bindParam(':seo_keywords', json_encode($data['seoKeywords']));
        
        if($stmt->execute()) {
            $data['id'] = $db->lastInsertId();
            echo json_encode($data);
        } else {
            echo json_encode(['error' => 'Failed to create blog']);
        }
        break;
}
?>
```

### 5. Users API Endpoint

Create `public_html/api/users/index.php`:

```php
<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all users
        $query = "SELECT id, name, email, role, status, avatar, subscription, registered_at, last_login, created_at FROM users ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($users);
        break;
        
    case 'POST':
        // Create new user
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Hash password
        $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
        
        $query = "INSERT INTO users (name, email, password, role, status) 
                  VALUES (:name, :email, :password, :role, :status)";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':role', $data['role']);
        $stmt->bindParam(':status', $data['status']);
        
        if($stmt->execute()) {
            $data['id'] = $db->lastInsertId();
            unset($data['password']); // Don't return password
            echo json_encode($data);
        } else {
            echo json_encode(['error' => 'Failed to create user']);
        }
        break;
}
?>
```

## 🔐 Environment Variables

Create a `.env.local` file in your Next.js project root:

```env
CPANEL_API_URL=https://your-domain.com/api
CPANEL_API_KEY=your-secure-api-key
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

## 📁 File Upload Setup

### 1. Create Upload Directory

In cPanel File Manager, create:
```
public_html/uploads/
├── videos/
├── images/
└── thumbnails/
```

### 2. Upload API Endpoint

Create `public_html/api/upload/index.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$upload_dir = '../uploads/';
$allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
$max_size = 100 * 1024 * 1024; // 100MB

if (!isset($_FILES['file'])) {
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
$file_type = $file['type'];
$file_size = $file['size'];

// Validate file type
if (!in_array($file_type, $allowed_types)) {
    echo json_encode(['error' => 'File type not allowed']);
    exit;
}

// Validate file size
if ($file_size > $max_size) {
    echo json_encode(['error' => 'File too large']);
    exit;
}

// Determine upload directory based on file type
if (strpos($file_type, 'image/') === 0) {
    $upload_path = $upload_dir . 'images/';
} elseif (strpos($file_type, 'video/') === 0) {
    $upload_path = $upload_dir . 'videos/';
} else {
    $upload_path = $upload_dir;
}

// Create directory if it doesn't exist
if (!is_dir($upload_path)) {
    mkdir($upload_path, 0755, true);
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '.' . $extension;
$filepath = $upload_path . $filename;

if (move_uploaded_file($file['tmp_name'], $filepath)) {
    $url = 'https://your-domain.com/uploads/' . (strpos($file_type, 'image/') === 0 ? 'images/' : 'videos/') . $filename;
    echo json_encode([
        'success' => true,
        'url' => $url,
        'filename' => $filename
    ]);
} else {
    echo json_encode(['error' => 'Failed to upload file']);
}
?>
```

## 🔒 Security Considerations

1. **API Key Protection**: Store your API key securely and never expose it in client-side code
2. **Input Validation**: Always validate and sanitize input data
3. **File Upload Security**: Implement proper file type and size validation
4. **SQL Injection Prevention**: Use prepared statements (already implemented in examples)
5. **CORS Configuration**: Configure CORS properly for your domain
6. **HTTPS**: Always use HTTPS in production

## 🚀 Testing the Setup

1. **Test Database Connection**: Verify your database connection works
2. **Test API Endpoints**: Use tools like Postman to test your API endpoints
3. **Test File Uploads**: Verify file upload functionality works
4. **Test Admin Panel**: Check that the admin panel can connect to your API

## 📞 Support

If you encounter issues:

1. Check cPanel error logs
2. Verify database credentials
3. Ensure PHP version compatibility
4. Check file permissions
5. Verify API endpoints are accessible

## 🔄 Next Steps

After setting up the backend:

1. Update the `CPANEL_CONFIG` in `src/lib/cpanel-config.ts` with your actual values
2. Test all admin panel functionality
3. Implement additional features like user authentication
4. Set up automated backups
5. Monitor performance and optimize as needed 