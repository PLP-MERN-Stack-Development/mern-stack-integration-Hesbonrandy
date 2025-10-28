# MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js).

## Screenshots

### Homepage
Homepage View

### Authentication
Login Interface

Registration Form
*New user registration form*

### Blog Management
Create Blog Post
*Create new blog post with rich text editor*

View Blog Post
*Single blog post view with comments*

## Features

- 👤 User authentication (register/login)
- 📝 Create, read, update, and delete blog posts
- 🏷️ Category management
- 🔒 Protected routes
- 💅 Clean and responsive UI

## Tech Stack

- **Frontend:**
  - React with Vite
  - React Router v6
  - Axios for API calls
  - Context API for state management

- **Backend:**
  - Node.js & Express
  - MongoDB & Mongoose
  - JWT authentication
  - Express Validator
  - Security middlewares (Helmet, CORS)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd mern-blog-app
```

2. Install server dependencies:
```sh
cd server
npm install
```

3. Configure server environment:
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and JWT secret

4. Install client dependencies:
```sh
cd ../client
npm install
```

5. Configure client environment:
   - Copy `.env.example` to `.env.local`
   - Update API base URL if needed

### Running the Application

1. Start the server:
```sh
cd server
npm run dev
```

2. Start the client:
```sh
cd client
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Visit `http://localhost:5173` to view the application.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Project Structure

```
mern-blog-app/
├── client/                 # Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context providers
│   │   ├── pages/        # Page components
│   │   └── hooks/        # Custom hooks
│   └── ...
└── server/                # Backend
    ├── config/           # Database configuration
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Database models
    └── routes/          # API routes
```

## License

MIT License





