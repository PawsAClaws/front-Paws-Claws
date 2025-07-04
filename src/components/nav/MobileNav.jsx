import React from 'react'
import { HouseLine, Heart, Bell } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import { useSelector } from "react-redux";

import NotificationsCard from '../NotificationsCard';




const MobileNav = ({ isNotificationsOpen, setIsNotificationsOpen, notificationsList, wishlistItems }) => {



    const userData = useSelector((state) => state.getUser.user);







    return (

        <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50'>

            <div className='flex gap-4 justify-around py-3.5'>

                <div className='flex flex-col gap-4 items-center justify-center'>
                    <HouseLine className='text-xl' />
                    <NavLink className="text-sm" to="/home" > Home </NavLink>
                </div>

                <div className='flex flex-col gap-4 items-center justify-center '>
                    <div className='relative'>
                        <Bell className='text-xl' />

                        {notificationsList.unreadCount > 0 && (
                            <span className="absolute  bottom-[15px]  left-[15px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {notificationsList.unreadCount}
                            </span>
                        )}
                    </div>
                    <button className="cursor-pointer text-sm" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}  > Notifications </button>

                    {isNotificationsOpen && (
                        <div className='fixed top-0 bottom-[90px] left-0 w-full z-50 '>
                            <NotificationsCard />
                        </div>
                    )}

                </div>




                <div className=''>

                    <div className='relative flex flex-col gap-4 items-center justify-center'>
                        <Heart className='text-xl' />
                        <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {wishlistItems.length}
                        </span>
                        <NavLink className="text-sm capitalize" to="/myWishlist" > Wishlist </NavLink>
                    </div>
                </div>

                <div className='flex flex-col gap-2 items-center justify-center'>

                    <div className='w-8 h-8 overflow-hidden rounded-full'>
                        <img className='w-full h-full ' src={userData.photo ? userData.photo : avatar} alt="my avatar" />
                    </div>

                    <NavLink className="text-sm" to="/profile" > MyAccount </NavLink>
                </div>

            </div>


        </div>

    )
}

export default MobileNav