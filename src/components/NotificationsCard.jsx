import React from 'react'
import { MagnifyingGlass, DotsThree } from 'phosphor-react'
import avatar from '../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from '../store/notificationsSlice';
import { useEffect } from 'react';
import BASE_URL, { cookies } from '../lib/api';
import axios from 'axios';
import { markAllAsRead } from '../store/notificationsSlice';
import noNoti from '../assets/noNoti.png';



const NotificationsCard = () => {

    const dispatch = useDispatch();

    const notificationsList = useSelector((state) => state.notifications);

    console.log(notificationsList);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, []);

    const unreadNotifications = notificationsList?.list.filter(n => !n.isReead);
    const readNotifications = notificationsList?.list.filter(n => n.isReead);


    const token = cookies.get("token");

    async function handleMarkAllAsRead() {

        try {

            const res = await axios.put(`${BASE_URL}/notification`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(res);
            dispatch(markAllAsRead());

        } catch (error) {

            console.log(error);

        }

    }



    return (

        <div className='w-screen lg:w-[500px] h-full bg-bg-app z-50 md:max-h-[600px] overflow-y-auto rounded-2xl'>

            <div className=''>

                <div className='flex justify-between p-4'>
                    <h5 className='text-2xl'>Notifications</h5>

                    <div className='flex gap-2 items-center'>
                        <div className='w-[44px] h-[44px] rounded-full bg-white flex justify-center items-center text-xl cursor-pointer'>
                            <MagnifyingGlass />
                        </div>

                        <div className='w-[44px] h-[44px] rounded-full bg-white flex justify-center items-center text-xl cursor-pointer'>
                            <DotsThree />
                        </div>

                    </div>

                </div>

                <div className='flex justify-between p-4 items-center'>

                    <div className='flex gap-1.5 items-center cursor-pointer'>
                        <div className='capitalize bg-[#F6EBE1] py-1 rounded-xl px-2.5'>all</div>
                        <div className='capitalize'>unread</div>
                    </div>

                    <div onClick={handleMarkAllAsRead} className='bg-white border cursor-pointer border-[#ddd] rounded-2xl rounded-tr-none py-5 w-fit px-[70px]'> mark all as read </div>

                </div>

                {unreadNotifications.length > 0 ? <p className='px-4 pb-3.5'> New </p> : ''}


                <div className='bg-[#F6EBE1] px-4'>


                    {unreadNotifications.length > 0 ? unreadNotifications.map((notification, index) => (

                        <div key={index} className='flex items-center gap-2  border-b border-[#A4A4A4] py-3.5'>
                            <div className='w-[60px] h-[70px]'>  <img src={avatar} alt="" /> </div>
                            <div> {notification.message} </div>
                        </div>
                    )) : ''}


                </div>

                {readNotifications.length > 0 ? <p className='px-4 pt-3.5'> Old </p> : ''}


                <div className='px-4 bg-bg-app '>

                    {readNotifications.length > 0 ? readNotifications.map((notification, index) => (

                        <div key={index} className='flex items-center gap-2  border-b border-[#A4A4A4] py-3.5'>
                            <div className='w-[60px] h-[70px]'>  <img src={avatar} alt="" /> </div>
                            <div> {notification.message} </div>
                        </div>
                    )) : <div>
                        <img className='w-full h-full' src={noNoti} alt="" />

                    </div>}
                </div>

            </div>



        </div>

    )

}

export default NotificationsCard