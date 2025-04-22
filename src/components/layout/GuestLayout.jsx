import React from 'react';
import Navbar from '../nav/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';

const GuestLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default GuestLayout;
