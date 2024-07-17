import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const { username, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-form">
                <h2>Register</h2>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={onChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit">Register</button>
                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
