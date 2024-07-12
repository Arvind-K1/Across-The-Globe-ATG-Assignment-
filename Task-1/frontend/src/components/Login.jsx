import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:8000/api/users/login', formData, {
                withCredentials: true, 
            });

            console.log(response.data); 

            navigate('/home'); 
        } catch (err) {
            console.error('Error:', err.response.data);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="auth-form">
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit">Login</button>
                <p>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
