import React, { useEffect } from 'react'
import { HouseLine, Plus, Bell } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../../store/getUserSlice';
import { div } from 'framer-motion/client';




const MobileNav = () => {




    const dispatch = useDispatch();
    const userData = useSelector((state) => state.getUser.user);


    useEffect(() => {

        dispatch(getUserData());
    }, [dispatch]);


    return (

        <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50'>

            <div className='flex gap-4 justify-around py-3.5'>

                <div className='flex flex-col gap-4 items-center justify-center'>
                    <HouseLine className='text-xl' />
                    <NavLink className="text-sm" to="/home" > Home </NavLink>
                </div>

                <div className='flex flex-col gap-4 items-center justify-center'>
                    <Bell className='text-xl' />
                    <NavLink className="text-sm" to="/notification" > Notifications </NavLink>
                </div>

                <div className='flex flex-col gap-4 items-center justify-center'>
                    <Plus className='text-xl' />
                    <NavLink className="text-sm" to="/category" > Add Post </NavLink>
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