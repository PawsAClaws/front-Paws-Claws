import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import BecomeDoctor from '../BecomeDoctor';
import NavbarLogin from '../nav/NavbarLogin';
import { ChatsCircle } from "phosphor-react";

const UserLayout = () => {
    const showCard = useSelector((state) => state.card.showCard);

    return (
        <div className='relative'>
            <NavbarLogin />

            {showCard && (
                <div className='fixed top-0 left-0 w-full h-full z-50 bg-black/50 overflow-y-auto'>
                    <div className='min-h-screen flex items-center justify-center px-4 py-8'>
                        <div className="w-full max-w-[900px] bg-white rounded-xl ">
                            <BecomeDoctor />
                        </div>
                    </div>
                </div>
            )}

            <div className='relative'>
                <Outlet />

                <div className='fixed bottom-6 right-6 z-40'>
                    <Link to="/chatRoom" className='w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-[rgba(254,142,47,0.28)] text-white shadow-lg cursor-pointer  '>
                        <ChatsCircle size={24} />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;