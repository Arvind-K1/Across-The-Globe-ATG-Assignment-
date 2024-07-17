import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem.jsx';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (err) {
                console.error('Error:', err.response.data);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-list-container">
            {posts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
