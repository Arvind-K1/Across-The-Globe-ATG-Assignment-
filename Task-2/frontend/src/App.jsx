import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';

import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

import Navbar from './components/Navbar';



function App() {
    return (
        <Router>
            <div className="app-container">
            <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset/:token" element={<ResetPassword />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/posts" element={<PostList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;