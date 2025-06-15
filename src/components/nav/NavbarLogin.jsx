import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import logo from '../../assets/logo.png'
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Heart, Globe, Bell } from "phosphor-react";
import avatar from '../../assets/avatar.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from '../Search.jsx';
import { useDispatch, useSelector } from "react-redux";
import { togleCard } from '../../store/becomeDoctorSlice.js';
import NotificationsCard from '../NotificationsCard.jsx';
import { cookies } from '../../lib/api.js';
import { fetchMyDoc } from '../../lib/getMyDoc.js';
import { useTranslation } from 'react-i18next';
import MobileNav from './MobileNav.jsx';
import { getAllWishList } from "../../store/wishlist.js";

export default function NavbarLogin() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);



    const menuRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.getWishlist.items);
    const queryClient = useQueryClient();

    const token = cookies.get('token');

    // Wishlist
    useEffect(() => {
        dispatch(getAllWishList());
    }, [dispatch]);

    // User Data Query
    const { data: userData = {} } = useQuery({
        queryKey: ['user', 'profile'],
        queryFn: async () => {
            const { getUserData } = await import('../../store/getUserSlice.js');
            const result = await dispatch(getUserData()).unwrap();
            return result || {};
        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    // Notifications Query
    const { data: notificationsList = { unreadCount: 0, notifications: [] } } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { fetchNotifications } = await import('../../store/notificationsSlice.js');
            const result = await dispatch(fetchNotifications()).unwrap();
            return result || { unreadCount: 0, notifications: [] };
        },
        enabled: !!token,
        staleTime: 1 * 60 * 1000,
        gcTime: 3 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchInterval: 2 * 60 * 1000,
    });

    // Calculate unread notifications count 
    const actualUnreadCount = useMemo(() => {
        if (!notificationsList || !Array.isArray(notificationsList)) {
            return 0;
        }
        return notificationsList.filter(notification =>
            notification.isReead === false
        ).length;
    }, [notificationsList]);

    // Doctor Status Query
    const { data: checkDoc = false } = useQuery({
        queryKey: ['doctor', 'status'],
        queryFn: async () => {
            const res = await fetchMyDoc();
            if (!res || res.message === "doctor not found") {
                console.log("Doctor not found or inactive");
                return false;
            }
            console.log("Doctor status response:", res);
            return res.data.active || false;
        },
        enabled: !!token,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    // Helper function to update wishlist count in cache
    const updateWishlistCache = (newItem = null, removeItemId = null) => {
        queryClient.setQueryData(['wishlist'], (oldData) => {
            if (!oldData) return [];

            if (removeItemId) {
                // Remove item from wishlist
                if (Array.isArray(oldData)) {
                    return oldData.filter(item => item.id !== removeItemId);
                }
                return {
                    ...oldData,
                    items: oldData.items?.filter(item => item.id !== removeItemId) || []
                };
            }

            if (newItem) {
                // Add item to wishlist
                if (Array.isArray(oldData)) {
                    return [...oldData, newItem];
                }
                return {
                    ...oldData,
                    items: [...(oldData.items || []), newItem]
                };
            }

            return oldData;
        });
    };

    // Make the cache updater available globally (optional)
    useEffect(() => {
        window.updateWishlistCache = updateWishlistCache;

        // Listen for custom events from other components
        const handleWishlistUpdate = (event) => {
            const { action, item, itemId } = event.detail;
            if (action === 'add') {
                updateWishlistCache(item);
            } else if (action === 'remove') {
                updateWishlistCache(null, itemId);
            } else if (action === 'refresh') {
                queryClient.invalidateQueries(['wishlist']);
            }
        };

        window.addEventListener('wishlistUpdate', handleWishlistUpdate);

        return () => {
            window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
            delete window.updateWishlistCache;
        };
    }, [queryClient]);

    // Language toggle function
    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = newLang;
    };

    useEffect(() => {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    function handleSignOut() {
        queryClient.clear();
        cookies.remove('token');
        navigate('/login');
    }

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

    const getWishlistCount = () => {
        if (Array.isArray(wishlistItems)) {
            return wishlistItems.length;
        }
        return wishlistItems?.items?.length || 0;
    };

    return (
        <div>
            <header className="bg-white sticky top-0 z-50 w-full">
                <div className="container mx-auto py-3 ">
                    <div className="flex justify-between items-center">
                        <div className="text-md md:text-2xl items-center text-gray-800 flex">
                            <img className='w-8 lg:w-10' src={logo} alt="logo" />
                            <Link to="home">
                                <h1 className='text-primary'>Paws&Claws</h1>
                            </Link>
                        </div>

                        <Search />

                        <div className='gap-4 hidden lg:flex'>
                            <div
                                className={`${token ? 'border-e-black border-e pe-3' : ''} lg:text-lg xl:text-2xl cursor-pointer`}
                                onClick={toggleLanguage}
                            >
                                <p>{i18n.language === 'ar' ? 'English' : 'عربي'}</p>
                            </div>

                            {/* Enhanced wishlist with real-time updates */}
                            {token ? (
                                <Link
                                    to="myWishlist"
                                    className='text-primary border-e-black lg:text-lg xl:text-2xl border-e pe-2 flex items-center gap-1 cursor-pointer'
                                    onClick={() => {
                                        // Refresh wishlist when clicked (optional)
                                        queryClient.invalidateQueries(['wishlist']);
                                    }}
                                >
                                    {t('nav.wishlist')}
                                    <span className="relative">
                                        <Heart className='inline-block' />
                                        {getWishlistCount() > 0 && (
                                            <span
                                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300"
                                                key={getWishlistCount()} // Force re-render when count changes
                                            >
                                                {getWishlistCount()}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            ) : ''}

                            {/* notifications */}
                            {token ? (
                                <div className='relative'>
                                    <div onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className='lg:text-lg xl:text-2xl items-center flex gap-2 text-primary'>
                                        <div className='cursor-pointer capitalize'>{t('nav.notifications')}</div>
                                        <Bell className='cursor-pointer' />
                                        <span className='relative'>
                                            {actualUnreadCount > 0 && (
                                                <span className="absolute -top-6 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                                    {actualUnreadCount}
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
                            ) : ''}
                        </div>

                        {/* account menu */}
                        {token ? (
                            <div className='gap-[18px] hidden lg:flex'>
                                <div>
                                    <div ref={menuRef} className='relative flex gap-2'>
                                        <div className='w-14 h-14 rounded-full'>
                                            <img className='w-full h-full rounded-full' src={userData.photo ? userData.photo : avatar} alt="avatar" />
                                        </div>

                                        <div>
                                            <p>{userData.firstName ? userData.firstName : t('user.user')}</p>
                                            <button
                                                className='text-primary cursor-pointer'
                                                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                            >
                                                {t('nav.myAccount')}
                                            </button>
                                        </div>

                                        {/* account menu */}
                                        {isAccountMenuOpen && (
                                            <div className="absolute top-14 right-5 w-48 border border-gray-200 bg-white shadow-lg rounded-lg py-4 z-50">
                                                <ul className="flex flex-col text-center gap-4">
                                                    <li><Link to="profile">{t('menu.profile')}</Link></li>
                                                    <li><a href="#">{t('menu.settings')}</a></li>
                                                    <li><a href="#">{t('menu.myAds')}</a></li>
                                                    <li><Link to="reservations">{t('menu.reservations')}</Link></li>

                                                    {checkDoc ? (
                                                        <li><Link to="doctorPage">{t('menu.myDocPage')}</Link></li>
                                                    ) : (
                                                        <li>
                                                            <button className='cursor-pointer' onClick={() => dispatch(togleCard())}>
                                                                {t('menu.becomeDoctor')}
                                                            </button>
                                                        </li>
                                                    )}

                                                    <li><a href="#">{t('menu.needHelp')}</a></li>
                                                </ul>
                                                <hr className="my-3 text-gray-200" />
                                                <button
                                                    onClick={handleSignOut}
                                                    className="text-red-500 flex items-center justify-center w-full cursor-pointer"
                                                >
                                                    {t('nav.signOut')} <span className="ms-1">↪</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : ''}

                        <div className='flex gap-4'>
                            {!token ? (
                                <Link to="/login" className="bg-primary cursor-pointer text-white py-1 px-2 md:py-3 md:px-6 rounded hidden lg:block">
                                    {t('nav.signIn')}
                                </Link>
                            ) : ''}

                            <div className="lg:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
                                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden bg-white py-4 space-y-4"
                    >
                        {token ? (
                            <div className='bg-[#FF9131] py-4 px-3 flex-wrap gap-y-2 flex items-center justify-between'>
                                <Link to="categories" className="bg-white cursor-pointer lg:hidden text-primary rounded-lg py-2 px-[18px]">
                                    {t('nav.postYourAd')}
                                </Link>

                                <div className='flex gap-1.5' onClick={toggleLanguage}>
                                    <span className='text-xl md:text-2xl cursor-pointer'>{i18n.language === 'ar' ? 'English' : 'عربي'}</span>
                                    <span><Globe className='inline-block text-2xl md:text-3xl cursor-pointer' /></span>
                                </div>

                                <div className='gap-[18px] items-center flex ml-auto sm:ml-0'>
                                    <div>
                                        <p className='text-white'>{userData.firstName ? userData.firstName : t('user.user')}</p>
                                    </div>

                                    <div className='w-14 h-14 rounded-full'>
                                        <img className='w-full h-full rounded-full' src={userData.photo ? userData.photo : avatar} alt="avatar" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='px-6'>
                                <Link to="/login" className="bg-primary cursor-pointer text-white py-2 px-4 rounded block text-center">
                                    {t('nav.signIn')}
                                </Link>
                            </div>
                        )}

                        {/* mobile Nav links */}
                        <div className='px-6 flex flex-col gap-6'>
                            <NavLink to="home" className="block">{t('nav.home')}</NavLink>
                            <NavLink to="doctors" className="block">{t('nav.doctors')}</NavLink>
                            <NavLink to="shop" className="block">{t('nav.shop')}</NavLink>
                            <NavLink to="adoption" className="block">{t('nav.adoption')}</NavLink>
                            <NavLink to="animals" className="block">{t('nav.animals')}</NavLink>
                            <NavLink to="doctorMap" className="block">{t('nav.nearestVet')}</NavLink>
                        </div>
                    </motion.div>
                )}

                {/* desktop Nav links */}
                <div className='bg-[#FBF0E7]'>
                    <div className='container mx-auto flex justify-between items-center'>
                        <div>
                            <ul className='hidden lg:flex gap-10 py-[18px]'>
                                <li><NavLink className="capitalize" to="home">{t('nav.home')}</NavLink></li>
                                <li><NavLink className="capitalize" to="animals">{t('nav.animals')}</NavLink></li>
                                <li><NavLink className="capitalize" to="adoption">{t('nav.adoption')}</NavLink></li>
                                <li><NavLink className="capitalize" to="shop">{t('nav.shop')}</NavLink></li>
                                <li><NavLink className="capitalize" to="doctors">{t('nav.doctor')}</NavLink></li>
                                <li><NavLink className="capitalize" to="doctorMap">{t('nav.nearestVet')}</NavLink></li>
                            </ul>
                        </div>

                        <Link to="categories" className="bg-[#FEA230] cursor-pointer hidden lg:flex text-white rounded-lg py-2 px-[18px]">
                            {t('nav.postYourAd')}
                        </Link>
                    </div>
                </div>

                {token ? (
                    <div className='lg:hidden'>
                        <MobileNav
                            setIsNotificationsOpen={setIsNotificationsOpen}
                            notificationsList={{
                                ...notificationsList,
                                unreadCount: actualUnreadCount
                            }}
                            isNotificationsOpen={isNotificationsOpen}
                            wishlistItems={wishlistItems}
                        />
                    </div>
                ) : ''}
            </header>
        </div>
    )
}