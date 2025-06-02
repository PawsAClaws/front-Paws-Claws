import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { cookies } from '../../lib/api';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    // احصل على التوكن من الـ cookies
    const token = cookies.get('token');

    // يمكنك كمان التحقق من صحة التوكن هنا
    const isTokenValid = (token) => {
        if (!token) return false;

        try {
            // لو بتستخدم JWT tokens، يمكنك تفحص الـ expiry date
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch (error) {
            // لو التوكن مش JWT أو في مشكلة، ارجع true (يعتمد على نوع التوكن بتاعك)
            return true;
        }
    };

    // لو مفيش توكن أو التوكن مش صالح، ارجع للـ login page
    if (!token || !isTokenValid(token)) {
        // امسح التوكن المنتهي الصلاحية من الـ cookies
        cookies.remove('token');

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // لو في توكن صالح، اعرض الـ component
    return children;
};

export default ProtectedRoute;