# Social Media App - Frontend

Welcome to the frontend repository of the Social Media App! This project is built using modern web technologies and is currently under development. The app provides social media functionalities such as posting, liking, commenting, and following users. Additionally, a real-time chat feature using PeerJS is being developed.

## Tech Stack

- **Vite** - Fast build tool for modern web applications
- **React** - UI library for building user interfaces
- **TypeScript** - Statically typed JavaScript for better maintainability
- **TailwindCSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests
- **Websockets** - peer-to-peer communication for real-time chat

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:RidhaMuneer/social-ui.git
   cd social-frontend
   ```

2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

3. Create a `.env` file and configure the necessary environment variables (VITE_PUBLIC_API_DEV=API_URL).

4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

The frontend should now be running at `http://localhost:5173/` (default Vite port).

## API Integration

This frontend connects to the **Social Media API** to handle user authentication, posts, likes, comments, follows, and more. The API is built using FastAPI and PostgreSQL, with authentication managed via JWT tokens.

### API Features
- User Authentication (Register, Login, JWT-based Sessions)
- Post Management (Create, Read, Update, Delete)
- Like & Comment on Posts
- Follow Users & Get Follow Suggestions
- View User Status (Followers, Following)
- Image Storage using AWS S3
- Protected Routes for authenticated users (In progess still)

For detailed API documentation, visit the backend repository:  
👉 [Social Media API Repository](https://github.com/RidhaMuneer/social-core)

## Development Notes
- The chat feature using **PeerJS** is still under development.
- UI is styled using **TailwindCSS** for fast and efficient styling.
- State management is handled using **React hooks**.

## Contribution
Feel free to contribute by submitting issues or pull requests.
