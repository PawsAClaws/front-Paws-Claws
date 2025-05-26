import React, { useEffect, useState } from 'react'
import { Pencil, ShareNetwork, Flag, Eye, User } from "phosphor-react";
import avatar from '../assets/avatar.png'
import { Link } from 'react-router-dom';
import { getUserData } from '../store/getUserSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyAd, fetchMyAds } from '../lib/myAds.js';
import { toast } from 'react-toastify';




const Profile = () => {


    const [myAdsData, setMyAdsData] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.getUser.user);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    useEffect(() => {

        const getAdsData = async () => {

            try {

                const data = await fetchMyAds();

                setMyAdsData(data.data);

            } catch (error) {
                console.log(error);
            }
        }

        getAdsData();

    }, [])

    const handleDeleteAd = async (id) => {
        try {
            await deleteMyAd(id);
            setMyAdsData(prevAds => prevAds.filter(ad => ad.id !== id));
            toast.success(" Your Ad deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
        } catch (error) {
            console.error('Failed to copy: ', error);
        }
    }






    return (

        <div className='bg-[#F9FAFB]'>

            <div className='w-full relative '>
                <img className='w-full ' src="https://as2.ftcdn.net/jpg/03/92/52/79/1000_F_392527967_xgcCQDVgieIQRNh3EbbOkS5AXcGsqzye.jpg" alt="" />

                <div className='absolute top-[85%] right-[3%] -translate-y-1/2 -translate-x-1/2 flex gap-2 text-white cursor-pointer md:text-3xl'>
                    <Pencil />
                    <Link to="/editProfile">Edit</Link>
                </div>

            </div>

            <div className='container mx-auto '>

                <div className='flex flex-col md:flex-row md:justify-between items-center gap-4 text-center'>

                    <div className='flex flex-col items-center md:flex-row gap-4 relative'>
                        <div className='w-[100px] h-[100px] md:h-[240px] md:w-[240px] rounded-full overflow-hidden mt-[-50px]'>
                            <img src={userData.photo ? userData.photo : avatar} alt="" />
                        </div>

                        <div className='flex flex-col items-center md:items-start justify-center'>
                            <div className='text-xl md:text-3xl lg:text-[40px]'> <span>{userData?.firstName}</span> <span>{userData?.lastName}</span> </div>
                            <div className='md:text-2xl text-[#424242] opacity-50'> {userData?.email} </div>
                        </div>
                    </div>

                    <div className='flex gap-6 justify-center md:justify-end text-xl'>

                        <div onClick={handleShare} className='flex gap-2 items-center cursor-pointer'>
                            <ShareNetwork />
                            <span> share </span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Flag />
                            <span> Report </span>
                        </div>
                    </div>
                </div>

                <div className='mt-20 flex items-center gap-4'>

                    <div> my ads </div>

                    <div className='bg-primary w-10 h-10 rounded-full text-white flex items-center justify-center'> {myAdsData.length} </div>


                </div>


                <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-[20%]'>


                    {

                        myAdsData.map((item, index) => {

                            return (
                                <div key={index} className='rounded-[8px] overflow-hidden'>

                                    <div className='bg-[#F6EBE1] flex gap-5 p-3.5'>

                                        <div> <img
                                            className='w-[220px] h-[200px] object-cover '
                                            src={item.photo}
                                            alt={item.title}
                                        />  </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='text-xl'> {item.title} </div>
                                            <div className='text-[#5F5B5B]'> {item.description} </div>
                                            <div> {item.price} </div>
                                            <div>{item.type}  </div>
                                        </div>

                                    </div>

                                    <div className='bg-white p-3.5'>
                                        <div className='flex flex-col gap-6  '>

                                            <div className='flex justify-between mt-[18px]'>
                                                <div> Published on  {item.createdAt ? formatDate(item.createdAt) : ''} </div>

                                                <div className='bg-[#999999] w-fit px-[18px] py-1.5 rounded-[30px]'> live </div>

                                            </div>

                                            <div className='flex justify-between '>

                                                <div className='flex gap-2 items-center'>
                                                    <div className='bg-[#F4F4F4] w-[40px] h-[40px] flex justify-center items-center text-[30px]'><Eye />  </div>
                                                    <span>500</span> views </div>

                                                <div className='flex gap-2 items-center'>
                                                    <div className='bg-[#F4F4F4] w-[40px] h-[40px] flex justify-center items-center text-[30px]'> <User />  </div>
                                                    <span>80</span> Leads </div>

                                            </div>

                                        </div>

                                        <div className='flex gap-3 mt-16 text-white'>
                                            <button onClick={() => handleDeleteAd(item.id)} className='bg-[#E6492D] w-1/2 py-3 rounded-[8px] cursor-pointer '> remove </button>
                                            <button className='bg-[#FE8E2F] w-1/2 py-3 rounded-[8px] cursor-pointer'> republish </button>
                                        </div>


                                    </div>

                                </div>

                            )

                        })
                    }






                </div>


            </div>



        </div>


    )

}

export default Profile