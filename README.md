# Full-Stack Application (MERN Stack)

This is a full-stack application built with the MERN stack (MongoDB, Express, React, Node.js). The application allows users to register, log in, and reset their password.

## Task 1: Basic User Authentication

### Features

- User registration with username, email, and password
- User login with email and password
- Forgot password functionality
- Reset password functionality

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running



### Getting Started

#### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:

    ```env
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

   The backend server will run on `http://localhost:5000`.

#### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `vite.config.js` file in the `frontend` directory with the following content:

    ```javascript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    });
    ```

4. Start the frontend development server:

    ```bash
    npm run dev
    ```

   The frontend server will run on `http://localhost:5173`.

### Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Register a new user.
3. Log in with the registered user.
4. You should be redirected to the home page upon successful login.
5. Test the forgot password and reset password functionalities.



