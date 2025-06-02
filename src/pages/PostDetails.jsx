import React, { useEffect, useState } from 'react'
import { Eye, Heart, ShareNetwork, Flag, MapPinLine } from "phosphor-react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pets from '../components/AdoptionPets';
import avatar from '../assets/avatar.png'
import { fetchPostDetails } from '../lib/postsApi';
import { useTranslation } from 'react-i18next';

const PostDetails = () => {
    const { t } = useTranslation();
    const [postDetails, setPostDetails] = useState([])

    console.log(postDetails);


    const { id } = useParams()

    console.log(id);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const getPostDetails = async () => {
            try {
                const data = await fetchPostDetails(id)
                setPostDetails(data?.data)
                console.log(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPostDetails()

    }, [])

    return (
        <div className='container mx-auto '>
            <div>
                <div className='flex justify-center mt-16'>
                    <img className='w-1/2' src={postDetails.photo ? postDetails.photo : avatar} alt={postDetails.title} />
                </div>
                <div className='  md:h-[200px]  mt-8 flex justify-between flex-col'>

                    <div className='flex justify-between  '>
                        <h5 className='md:text-3xl lg:text-[40px] font-semibold tracking-[0.32px]'> {postDetails.title} </h5>
                        <div className='text-center text-primary tracking-[0.2px]'> {postDetails.price == 0 ? t('postDetails.free') : postDetails.price} </div>
                    </div>

                    <div className='flex  justify-between '>
                        <div className='flex items-center'>
                            <MapPinLine className='text-primary text-xl' />
                            <p className='ml-2 text-sm opacity-50'> {postDetails.country} ( {postDetails.city} ) </p>
                        </div>

                        <div className='bg-[#FBF0E7] p-3  text-center w-fit'> {postDetails.negotiable ? t('createAd.Negotiable') : t('createAd.not negotiable')} </div>
                    </div>

                </div>
                <div className=' lg:flex justify-between items-center'>

                    <div className={`bg-[#EFEFEF] mt-20  py-4 flex justify-around items-center text-center lg:w-1/2 w-full ${postDetails.type == 'shop' ? 'hidden' : ''}`}>

                        <div> <span className='md:text-xl'>{t('createAd.gender')} :  {postDetails.gender} </span> </div>

                        <div className="w-px h-6 bg-[#C2C2C2]"></div>

                        <div> <span className='md:text-xl'>{t('createAd.age')} : {postDetails.age}</span> </div>

                        <div className="w-px h-6 bg-[#C2C2C2]"></div>

                        <div> <span className='md:text-xl' >Weight : {postDetails.weight} kg </span> </div>

                    </div>

                    <div className='text-end mt-10 lg:w-1/2 text-[#606060] text-2xl'>
                        {postDetails.createdAt ? formatDate(postDetails.createdAt) : ''}
                    </div>

                </div>
                <div className='h-[1px] mt-16 mb-8 bg-[#C2C2C2]'></div>

                <div className='flex flex-col gap-4 w-full lg:w-1/2 md:w-[90%]'>
                    <h6 className='text-2xl'> {t('postDetails.description')} </h6>
                    <p> {postDetails.description} </p>
                </div>
                <div className='h-[1px] mt-16 mb-8 bg-[#C2C2C2]'></div>
                <div className='h-[200px]'>

                    <div className='text-2xl mb-5'> {t('postDetails.listedBy')} : </div>

                    <div className='flex justify-between'>

                        {/* Avatar */}
                        <div className='flex items-center gap-4'>

                            <div className='w-[70px] h-[70px] md:w-[138px] md:h-[138px] border-4 border-primary rounded-full'>
                                <img className='w-full h-full rounded-full' src={postDetails?.user?.photo ? postDetails?.user?.photo : avatar} alt="" />
                            </div>

                            <div>
                                <h4 className='md:text-xl lg:text-[32px]'> {postDetails?.user?.firstName} </h4>
                                <p className='text-[#878787] text-[12px] md:text-[16px] lg:text-[24px] '> member since 2025 </p>
                                <Link to={`/userProfile/${postDetails.userId}`} className='text-primary' > {t('postDetails.viewProfile')}   </Link>
                            </div>
                        </div>
                        <div className='flex justify-between flex-col gap-5 '>

                            {/* Likes and views */}
                            <div className='flex gap-2.5 md:gap-[34px] flex-col md:flex-row '>

                                <div className='bg-[#FBF0E7] w-fit flex py-2.5 px-[26px] gap-2 items-center'>
                                    <div> <Eye /> </div>
                                    <div> Views: 20 </div>
                                </div>

                                <div className='bg-[#FBF0E7] w-fit py-2.5 px-[26px] flex gap-2 items-center'>
                                    <Heart className='inlineblock' />
                                    <div> Likes: 20 </div>
                                </div>

                            </div>

                            {/* Share and report */}
                            <div className='flex gap-6 justify-end'>

                                <div className='flex gap-2 items-center'>
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
                </div>
                <div className='h-[1px] mt-5 md:mt-8 mb-8 bg-[#C2C2C2]'></div>
                <div>
                    <Pets />
                </div>
                <div className='h-[1px] mt-16 mb-8 bg-[#C2C2C2]'></div>
                <div className='mb-[100px]'>
                    <div className='mb-[18px] text-2xl'> {t('postDetails.safety')} </div>
                    <ul className='list-disc list-inside text-xl text-[#707070]'>
                        <li> {t('postDetails.tips.0')} </li>
                        <li> {t('postDetails.tips.1')} </li>
                        <li> {t('postDetails.tips.2')} </li>
                        <li> {t('postDetails.tips.3')} </li>
                    </ul>
                </div>

                <div className='flex gap-10 text-center mb-[10%] text-white '>

                    {postDetails.userId ? (
                        <Link to={`/chatRoom/${postDetails.userId}`} className='w-1/3 bg-primary py-8 rounded-[11px] cursor-pointer'>  {t('postDetails.chat')} </Link>
                    ) : (
                        <button className='w-1/3 bg-primary py-8 rounded-[11px] cursor-pointer'>  {t('postDetails.chat')} </button>
                    )}

                    {/* onClick={() => handleStartChat(postOwnerId, navigate)} */}

                    <button className='w-1/3 bg-black py-8 rounded-[11px] cursor-pointer'>  {t('postDetails.sms')} </button>
                    <button className='w-1/3 bg-green-500 py-8 rounded-[11px] cursor-pointer'>  {t('postDetails.call')} </button>

                </div>

            </div>

        </div>
    )
}

export default PostDetails