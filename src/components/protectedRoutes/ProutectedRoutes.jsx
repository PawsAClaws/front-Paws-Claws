import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { cookies } from '../../lib/api';
import Home from '../../pages/Home';


const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const token = cookies.get('token');

    const isTokenValid = (token) => {
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch (error) {
            return false;
        }
    };

    if (!token || !isTokenValid(token)) {
        cookies.remove('token');

        return <Home showLoginMessage={true} />;
    }

    return children;
};

export default ProtectedRoute;