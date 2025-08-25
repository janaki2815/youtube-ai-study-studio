# AI Learning Hub - Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, frontend)
npm run install-all
```

### 3. Environment Setup
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/ai-learning-hub
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 5. Run the Application
```bash
# Development mode (both frontend and backend)
npm run dev

# Or run separately:
# Backend: cd backend && npm run dev
# Frontend: cd frontend && npm start
```

## Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features Available
- ✅ User registration and login
- ✅ JWT authentication
- ✅ YouTube video URL parsing
- ✅ Automatic metadata extraction
- ✅ Video CRUD operations
- ✅ Responsive UI with Tailwind CSS
- ✅ Modern React components

## Testing the Application
1. Register a new account
2. Login with your credentials
3. Add a YouTube video URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
4. View, edit, and delete your saved videos

## Troubleshooting
- Make sure MongoDB is running
- Check that all dependencies are installed
- Verify environment variables are set correctly
- Check console for any error messages
