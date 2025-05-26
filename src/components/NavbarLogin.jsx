import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png'
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Heart, Globe, Bell } from "phosphor-react";
import avatar from '../assets/avatar.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from "react-redux";
import { getAllWishList } from "../store/wishlist.js";
import { getUserData } from '../store/getUserSlice.js';
import MobileNav from './nav/MobileNav.jsx';
import { togleCard } from '../store/becomeDoctorSlice.js';
import NotificationsCard from './NotificationsCard.jsx';
import { fetchNotifications } from '../store/notificationsSlice.js';
import { cookies } from '../lib/api.js';
import { fetchMyDoc } from '../lib/getMyDoc.js';






export default function NavbarLogin() {


    const [isOpen, setIsOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [checkDoc, setCheckDoc] = useState(false);

    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.getWishlist.items);
    const userData = useSelector((state) => state.getUser.user);
    const notificationsList = useSelector((state) => state.notifications);

    console.log(userData);



    function handleSignOut() {

        cookies.remove('token')
        navigate('/login')

    }

    useEffect(() => {
        dispatch(getAllWishList());
        dispatch(getUserData());
        dispatch(fetchNotifications());
    }, [dispatch]);




    useEffect(() => {

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsAccountMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    useEffect(() => {

        const handleMyDoc = async () => {

            const res = await fetchMyDoc();
            console.log(res.data);

            if (res.data.active) {
                setCheckDoc(true);
            } else {
                setCheckDoc(false);
            }

        }

        handleMyDoc();

    }, []);


    return (

        <div>

            <header className="bg-white  sticky top-0 z-50 w-full ">

                <div className=" container mx-auto py-3 px-6">

                    <div className="flex justify-between  items-center">

                        <div className=" text-md md:text-2xl  items-center  text-gray-800 flex">
                            <img className='w-8 lg:w-10' src={logo} alt="logo" />

                            <Link to="home">  <h1 className='text-primary'>Paws&Claws </h1> </Link>

                        </div>

                        <Search />

                        <div className=' gap-4 hidden lg:flex'>

                            <div className='border-e-black border-e pe-3 lg:text-lg xl:text-2xl cursor-pointer'>
                                <p>العربية</p>
                            </div>

                            <Link to="myWishlist" className='text-primary border-e-black lg:text-lg xl:text-2xl border-e pe-2 flex items-center gap-1 cursor-pointer'>
                                Wishlist
                                <span className="relative">
                                    <Heart className='inline-block ' />
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </span>
                            </Link>

                            <div className=' relative   '>

                                <div onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className='lg:text-lg xl:text-2xl items-center flex gap-2 text-primary'>
                                    <div className='cursor-pointer capitalize  '>notifications</div>
                                    <Bell className='cursor-pointer ' />

                                    <span className='relative'>

                                        {notificationsList.unreadCount > 0 && (
                                            <span className="absolute -top-6 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                                {notificationsList.unreadCount}
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className='absolute top-10 right-0'>

                                    {isNotificationsOpen && (
                                        <NotificationsCard />
                                    )}

                                </div>

                            </div>



                        </div>



                        {/* account menu */}
                        <div className=' gap-[18px] hidden lg:flex'>

                            <div>
                                <div ref={menuRef} className='relative flex gap-2'>

                                    <div className='w-14 h-14 rounded-full'>
                                        <img className='w-full h-full rounded-full' src={userData.photo ? userData.photo : avatar} alt="avatar" />
                                    </div>

                                    <div>
                                        <p> {userData.firstName ? userData.firstName : 'User'} </p>
                                        <button
                                            className='text-primary cursor-pointer'
                                            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                        >
                                            my account
                                        </button>
                                    </div>

                                    {isAccountMenuOpen && (
                                        <div className="absolute top-20 right-0 w-48 bg-white shadow-lg rounded-lg py-4 z-50">
                                            <ul className="flex flex-col text-center gap-4">
                                                <li><Link to="profile">profile</Link></li>
                                                <li><a href="#">Settings</a></li>
                                                <li><a href="#">My Ads</a></li>

                                                {checkDoc ? (
                                                    <li><Link to="doctorPage">My Doc Page</Link></li>
                                                ) : (
                                                    <li> <button className='cursor-pointer' onClick={() => dispatch(togleCard())} > become a doctor</button> </li>
                                                )}



                                                <li><a href="#">Need Help?</a></li>
                                            </ul>
                                            <hr className="my-3" />
                                            <button
                                                onClick={handleSignOut}
                                                className="text-red-500 flex items-center justify-center w-full cursor-pointer"
                                            >
                                                Sign Out <span className="ms-1">↪</span>
                                            </button>
                                        </div>
                                    )}


                                </div>
                            </div>
                        </div>



                        <div className='flex gap-4'>
                            <div className="lg:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
                                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="lg:hidden bg-white  py-4  space-y-4">

                            <div className='bg-[#FF9131] py-4 px-3 flex-wrap gap-y-2 flex items-center justify-between'>

                                <Link to="categories" className="bg-white cursor-pointer  lg:hidden text-primary rounded-lg py-2 px-[18px]">
                                    Post your ad
                                </Link>

                                <div className='flex gap-1.5'> <span className=' text-xl md:text-2xl'>العربية</span> <span> <Globe className='inline-block text-2xl md:text-3xl' /></span> </div>

                                <div className=' gap-[18px] items-center flex ml-auto sm:ml-0'>

                                    <div>
                                        <p className='text-white'> {userData.firstName ? userData.firstName : 'User'} </p>

                                    </div>

                                    <div className='w-14 h-14 rounded-full '>
                                        <img className='w-full h-full rounded-full' src={userData.photo ? userData.photo : avatar} alt="avatar" />
                                    </div>
                                </div>
                            </div>


                            {/* mobile Nav links */}

                            <div className='px-6 flex flex-col gap-6'>
                                <NavLink to="home" className="block ">Home</NavLink>
                                <NavLink to="doctors" className="block ">doctors</NavLink>
                                <NavLink to="shop" className="block ">shop</NavLink>
                                <NavLink to="adoption" className="block ">adoption</NavLink>
                                <NavLink to="animals" className="block ">animals</NavLink>
                                <NavLink to="doctorMap" className="block "> nearest vet</NavLink>
                            </div>

                        </motion.div>
                    )
                }



                {/* desktop Nav links */}

                <div className='bg-[#FBF0E7]'>

                    <div className='container mx-auto flex justify-between items-center '>

                        <div>
                            <ul className='hidden lg:flex gap-10 py-[18px]'>
                                <li> <NavLink className="capitalize" to="home">Home</NavLink> </li>
                                <li><NavLink className="capitalize" to="animals">Animals</NavLink></li>
                                <li><NavLink className="capitalize" to="adoption">Adoption</NavLink></li>
                                <li><NavLink className="capitalize" to="shop">shop</NavLink></li>
                                <li><NavLink className="capitalize" to="doctors">doctor</NavLink></li>
                                <li> <NavLink className="capitalize" to="doctorMap" > nearest vet</NavLink> </li>



                            </ul>
                        </div>

                        <Link to="categories" className="bg-[#FEA230] cursor-pointer hidden lg:flex text-white rounded-lg py-2 px-[18px]">
                            Post your ad
                        </Link>

                    </div>
                </div>

                <div className='lg:hidden '>
                    <MobileNav setIsNotificationsOpen={setIsNotificationsOpen} notificationsList={notificationsList} isNotificationsOpen={isNotificationsOpen} />
                </div>

            </header >

        </div >
    )
}
