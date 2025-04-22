import React from 'react';
import NavbarLogin from '../NavbarLogin';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';

const UserLayout = () => {
    return (
        <div>
            <NavbarLogin />
            <Outlet />
            <Footer />
        </div>
    );
};

export default UserLayout;
