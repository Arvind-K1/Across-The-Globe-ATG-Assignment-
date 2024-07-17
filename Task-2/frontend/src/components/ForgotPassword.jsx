import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/forgot-password', { email });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-form">
                <h2>Forgot Password</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
