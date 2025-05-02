import React, { useEffect, useState } from 'react'
import { MapPinLine, Heart } from "phosphor-react";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toggleItem } from '../store/wishlist';
import { fetchWishList } from '../lib/WishListApi';
import { useDispatch } from 'react-redux';
import { openLoginAlert } from '../store/loginAlertSlice';


export default function Card({ data }) {


    const dispatch = useDispatch();

    const wishlist = useSelector(state => state.getWishlist.items);


    const inWishlist = wishlist?.some(item => item.postId === data.id);


    function requireLogin(callback) {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(openLoginAlert());
        } else {
            callback();
        }
    }


    const handleWishlist = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        try {

            const response = await fetchWishList(data.id);
            dispatch(toggleItem(data.id));
            toast.success(response.message.includes("added") ? "Added to wishlist ❤️" : "Removed from wishlist 💔");

        } catch (error) {
            console.log(error);
        }
    }



    return (

        <Link to={`/postDetails/${data.id}`} className="bg-white rounded-lg relative" >

            <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlist(e);

                }}
                className='w-[22px] h-[22px] bg-white md:w-8 md:h-8 lg:w-10 lg:h-10 absolute top-4 right-4 rounded-sm '>
                <div className={`flex justify-center items-center h-full 
                    ${inWishlist ? "text-[#FF4646]" : "text-gray-400"} 

            text-[14px] md:text-[22px] lg:text-[27px]`}>

                    <Heart weight={inWishlist ? "fill" : "regular"} />
                </div>
            </div>

            <div className=' w-full md:w-full h-[150px] md:h-[200px] '>
                <img src={data.photo} alt={data.title} className="w-full h-full object-cover" />
            </div>

            <div className="py-6 px-[18px]">
                <h4 className="text-xl font-semibold  mb-2"> {data.title} </h4>
                <p className="text-[#5F5B5B] my-6"> {data.description}</p>

                <div className='flex justify-between '>

                    <div className='flex items-center'>
                        <MapPinLine className=' text-primary text-xl' />
                        <p className='ml-1 text-sm opacity-50'> {data.country} ( {data.city} ) </p>
                    </div>

                    <div className='text-primary text-xl'> ${data.price} </div>

                </div>
            </div>
        </Link>

    )
}



