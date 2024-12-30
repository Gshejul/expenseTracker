import React from 'react';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (username: string, password: string) => {
        try {
            const response = await registerUser(username, password);
            login(response.data.token); // Set the token in context
            navigate('/dashboard'); // Redirect to dashboard after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <AuthForm isLogin={false} onSubmit={handleRegister} />
        </div>
    );
};

export default Register;