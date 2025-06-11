import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../lib/api';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        const token = cookies.get('token');
        const userData = cookies.get('user') || localStorage.getItem('user');

        if (token) {
            try {

                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);

                if (payload.exp > currentTime) {
                    setIsAuthenticated(true);
                    if (userData) {
                        setUser(typeof userData === 'string' ? JSON.parse(userData) : userData);
                    }
                } else {

                    logout();
                }
            } catch (error) {

                setIsAuthenticated(true);
                if (userData) {
                    setUser(typeof userData === 'string' ? JSON.parse(userData) : userData);
                }
            }
        }

        setLoading(false);
    };

    const login = (token, userData = null) => {
        cookies.set('token', token);
        if (userData) {
            cookies.set('user', JSON.stringify(userData));
            setUser(userData);
        }
        setIsAuthenticated(true);
    };

    const logout = () => {
        cookies.remove('token');
        cookies.remove('user');
        cookies.removeItem('user');

        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    const getToken = () => {
        return cookies.get('token');
    };

    const getUser = () => {
        const userData = cookies.get('user') || localStorage.getItem('user');
        if (userData) {
            return typeof userData === 'string' ? JSON.parse(userData) : userData;
        }
        return null;
    };

    return {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        getToken,
        getUser,
        checkAuthStatus
    };
};

export default useAuth;