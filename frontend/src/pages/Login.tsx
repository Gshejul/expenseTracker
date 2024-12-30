import React from 'react';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await loginUser(username, password);
            login(response.data.token); // Set the token in context
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <AuthForm isLogin={true} onSubmit={handleLogin} />
        </div>
    );
};

export default Login;