import React, { useEffect, useState } from 'react'
import { ShareNetwork, Flag, Eye, User } from "phosphor-react";
import avatar from '../assets/avatar.png'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserId } from '../lib/getUserId.js';




const UserProfile = () => {


    const [userAds, setUserAds] = useState();

    const { id } = useParams();


    console.log(userAds);




    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };




    useEffect(() => {



        const getAdsData = async () => {

            try {

                const data = await getUserId(id);

                console.log(data);

                setUserAds(data);

            } catch (error) {
                console.log(error);
            }
        }

        getAdsData();

    }, [])



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

            <div className='w-full  '>
                <div className="h-32 md:h-[300px] bg-gradient-to-r from-orange-300 to-orange-400" />            </div>

            <div className='container mx-auto '>

                <div className='flex flex-col md:flex-row md:justify-between items-center gap-4 text-center'>

                    <div className='flex flex-col items-center md:flex-row gap-4 relative'>
                        <div className='w-[100px] h-[100px] md:h-[240px] md:w-[240px] rounded-full overflow-hidden mt-[-50px]'>
                            <img src={userAds?.photo ? userAds?.photo : avatar} alt="" />
                        </div>

                        <div className='flex flex-col items-center md:items-start justify-center'>
                            <div className='text-xl md:text-3xl lg:text-[40px]'> <span>{userAds?.firstName}</span> <span>{userAds?.lastName}</span> </div>
                            <div className='md:text-2xl text-[#424242] opacity-50'> {userAds?.email} </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-10'>

                        <div>
                            <Link to={`/chatRoom/${userAds?.id}`} className='text-white text-center bg-primary px-[100px] py-3 rounded-lg '>
                                chat
                            </Link>
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
                </div>

                <div className='mt-20 flex items-center gap-4'>

                    <div className='capitalize'> user ads </div>

                    <div className='bg-primary w-10 h-10 rounded-full text-white flex items-center justify-center'> {userAds?.posts.length} </div>


                </div>


                <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-[20%]'>

                    {

                        userAds?.posts.map((item, index) => {

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
                                            <div className='text-primary'> {item.price} </div>
                                            <div className='capitalize'>{item.type}  </div>
                                        </div>

                                    </div>

                                    <div className='bg-white p-3.5'>
                                        <div className='flex flex-col gap-6  '>

                                            <div className='flex justify-between mt-[18px]'>
                                                <div> Published on  {item.createdAt ? formatDate(item.createdAt) : ''} </div>

                                                <div className='bg-[#F6EBE1] border border-black w-fit px-[18px] py-1.5 rounded-[30px]'> live </div>

                                            </div>

                                            <div className=''>

                                                <Link to={`/postDetails/${item.id}`}><button className='bg-primary cursor-pointer text-white w-full py-2 rounded-lg'> View ad </button></Link>

                                            </div>

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

export default UserProfile