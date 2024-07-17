import React, { useState } from 'react';
import axios from 'axios';

const PostItem = ({ post }) => {
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [commentText, setCommentText] = useState('');

    const handleLike = async () => {
        try {
            const response = await axios.post(`https://localhost:5000/api/posts/${post._id}/like`);
            setLikes(response.data.likes);
        } catch (err) {
            console.error('Error:', err.response.data);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://localhost:5000/api/posts/${post._id}/comments`, { text: commentText });
            setComments(response.data.comments);
            setCommentText('');
        } catch (err) {
            console.error('Error:', err.response.data);
        }
    };

    return (
        <div className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.image && <img src={`https://localhost:5000/${post.image}`} alt={post.title} />}
            <div>
                <button onClick={handleLike}>Like ({likes.length})</button>
            </div>
            <div>
                <form onSubmit={handleComment}>
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment"
                        required
                    />
                    <button type="submit">Comment</button>
                </form>
            </div>
            <div>
                {comments.map((comment) => (
                    <p key={comment._id}>{comment.text}</p>
                ))}
            </div>
        </div>
    );
};

export default PostItem;
