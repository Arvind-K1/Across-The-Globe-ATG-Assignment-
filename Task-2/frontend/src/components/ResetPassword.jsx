import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/users/reset/${token}`, { password });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-form">
                <h2>Reset Password</h2>
                <div>
                    <label>New Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
