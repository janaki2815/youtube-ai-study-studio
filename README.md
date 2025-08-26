# AI Learning Hub

A MERN stack application for saving and managing YouTube learning videos. Users can register, login, and save YouTube videos to their personal collection with automatic metadata extraction.

## Features

- 🔐 **User Authentication**: Register and login with JWT tokens
- 📺 **YouTube Video Saving**: Paste YouTube URLs to automatically extract metadata
- 📱 **Responsive Design**: Clean, modern UI built with React and Tailwind CSS
- 🗄️ **MongoDB Storage**: Persistent data storage for users and videos
- ✏️ **CRUD Operations**: Create, read, update, and delete saved videos
- 🎨 **Modern UI**: Beautiful interface with smooth animations and transitions

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **axios** for HTTP requests

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-learning-hub
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ai-learning-hub
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

   **Note**: Replace the JWT_SECRET with a strong, unique secret key for production.

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Or run both simultaneously**
   ```bash
   # From the root directory
   npm run dev
   ```

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Videos
- `GET /api/videos` - Get all videos for authenticated user
- `POST /api/videos` - Add a new video
- `GET /api/videos/:id` - Get a specific video
- `PUT /api/videos/:id` - Update a video
- `DELETE /api/videos/:id` - Delete a video

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Add Videos**: Paste YouTube URLs in the form to automatically save videos with metadata
3. **Manage Collection**: View, edit, and delete your saved videos
4. **Watch Videos**: Click on video thumbnails to open videos in YouTube

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] AI-powered video recommendations
- [ ] Video categories and tags
- [ ] Search and filter functionality
- [ ] Video playlists
- [ ] Social features (sharing, following)
- [ ] Video notes and timestamps
- [ ] Export/import functionality
- [ ] Dark mode theme
- [ ] Mobile app version

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
