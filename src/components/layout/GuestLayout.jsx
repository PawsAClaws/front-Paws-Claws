import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import NavbarLogin from '../nav/NavbarLogin';



const GuestLayout = () => {
    return (
        <div>
            <NavbarLogin />
            <Outlet />
            <Footer />
        </div>
    );
};

export default GuestLayout;
