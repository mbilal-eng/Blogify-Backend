# 🚀 Blogify - Modern Blog Platform API

A comprehensive RESTful API for a Medium-like blog platform built with Node.js, Express.js, and MongoDB. Features user authentication, blog management, like system, and comments functionality.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Usage Examples](#-usage-examples)
- [Error Handling](#-error-handling)
- [Contributing](#-contributing)

## ✨ Features

- **🔐 JWT Authentication** - Secure user registration and login
- **👤 User Management** - Complete user profiles with social links
- **📝 Blog CRUD** - Create, read, update, and delete blogs
- **❤️ Like System** - Like/unlike blogs with one-like-per-user restriction
- **💬 Comments** - Add comments to blogs
- **🔒 Protected Routes** - Secure endpoints with authentication middleware
- **📊 Real-time Counters** - Automatic like and comment counters
- **🛡️ Password Security** - bcrypt password hashing
- **📱 RESTful API** - Clean and consistent API design

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Environment**: dotenv for configuration

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Blogify-Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Setup](#-environment-setup))

5. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/blogify
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/blogify

# JWT Secret (use a strong, random string in production)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server
PORT=3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```bash
POST /auth/register
```

#### Login User
```bash
POST /auth/login
```

### User Endpoints

#### Get All Users
```bash
GET /user/
```

#### Get User by ID
```bash
GET /user/:id/me
```

### Blog Endpoints

#### Get All Blogs
```bash
GET /blog/
```

#### Get Blog by ID
```bash
GET /blog/:id
```

#### Create Blog (Protected)
```bash
POST /blog/
```

#### Update Blog (Protected)
```bash
PUT /blog/:id
```

#### Delete Blog (Protected)
```bash
DELETE /blog/:id
```

### Like Endpoints (All Protected)

#### Like a Blog
```bash
POST /blog/:id/like
```

#### Unlike a Blog
```bash
DELETE /blog/:id/like
```

#### Toggle Like
```bash
POST /blog/:id/toggle-like
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

## 💻 Usage Examples

### 1. User Registration

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "bio": "Software Developer",
    "city": "New York"
  }'
```

**Response:**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "User Register Successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "Software Developer",
      "city": "New York"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. User Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login Successful",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

### 3. Create a Blog

```bash
curl -X POST http://localhost:3000/api/v1/blog/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "except": "A brief excerpt of the blog post",
    "tags": ["technology", "programming"],
    "status": "public"
  }'
```

### 4. Get All Blogs

```bash
curl -X GET http://localhost:3000/api/v1/blog/
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Blogs Fetched Successfully",
  "data": {
    "total": 2,
    "blogs": [
      {
        "_id": "blog_id",
        "title": "My First Blog Post",
        "content": "This is the content...",
        "likesCount": 5,
        "isLiked": true,
        "author": {
          "name": "John Doe",
          "email": "john@example.com",
          "avatar": "avatar_url"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### 5. Get Single Blog

```bash
curl -X GET http://localhost:3000/api/v1/blog/BLOG_ID
```

### 6. Like a Blog

```bash
curl -X POST http://localhost:3000/api/v1/blog/BLOG_ID/like \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Blog liked successfully",
  "data": {
    "likesCount": 6,
    "isLiked": true
  }
}
```

### 7. Unlike a Blog

```bash
curl -X DELETE http://localhost:3000/api/v1/blog/BLOG_ID/like \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 8. Toggle Like (Like if not liked, Unlike if already liked)

```bash
curl -X POST http://localhost:3000/api/v1/blog/BLOG_ID/toggle-like \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 9. Update Blog

```bash
curl -X PUT http://localhost:3000/api/v1/blog/BLOG_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Blog Title",
    "content": "Updated content..."
  }'
```

### 10. Delete Blog

```bash
curl -X DELETE http://localhost:3000/api/v1/blog/BLOG_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 11. Get All Users

```bash
curl -X GET http://localhost:3000/api/v1/user/
```

### 12. Get User by ID

```bash
curl -X GET http://localhost:3000/api/v1/user/USER_ID/me
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### Common Error Scenarios

- **401 Unauthorized**: Invalid or missing JWT token
- **404 Not Found**: Resource doesn't exist
- **400 Bad Request**: Validation errors or duplicate actions
- **500 Internal Server Error**: Server-side errors

## 🔧 Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if implemented)
```

### Project Structure

```
src/
├── app.js                 # Main application file
├── config/
│   └── db.js             # Database configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── blog.controller.js     # Blog operations
│   └── user.controller.js     # User operations
├── middleware/
│   └── auth.middleware.js     # JWT authentication middleware
├── models/
│   ├── blog.model.js          # Blog schema
│   └── user.model.js          # User schema
├── routes/
│   ├── auth.route.js          # Authentication routes
│   ├── blog.route.js          # Blog routes
│   └── user.route.js          # User routes
└── utils/
    └── responseHandler.js     # Standardized response format
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Authentication middleware for sensitive operations
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Secure error messages without sensitive data exposure

## 📊 Database Schema

### User Model
- Personal information (name, email, bio, city)
- Social links (up to 5 links)
- Avatar and website
- Password (hashed with bcrypt)

### Blog Model
- Author reference to User
- Content (title, excerpt, content, cover image)
- Metadata (tags, status, timestamps)
- Likes system (array of user IDs + counter)
- Comments system (embedded documents)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Happy Blogging! 🎉**