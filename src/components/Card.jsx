import React, { useEffect, useState } from 'react'
import { MapPinLine, Heart } from "phosphor-react";
import { toast } from 'react-toastify';
import { fetchWishList, myWishlists } from '../lib/WishListApi';
import { Link } from 'react-router-dom';



export default function Card({ data }) {


    const [inWishlist, setInWishlist] = useState(false);




    useEffect(() => {
        const fetchAllWishlist = async () => {

            try {
                const wishlistData = await myWishlists();

                const isInList = wishlistData?.data.some(item => item.postId == data.id);
                setInWishlist(isInList);

            } catch (error) {
                console.log("Error fetching wishlist:", error);
            }
        };

        fetchAllWishlist();

    }, []);




    const handleWishlist = async () => {

        try {

            const response = await fetchWishList(data.id);



            if (response.message == "post added to wishlist") {
                const newState = !inWishlist;
                setInWishlist(newState);


                toast.success(
                    "Added to wishlist ❤️"
                );

            } else {

                const newState = !inWishlist;
                setInWishlist(newState);

                toast.success(
                    "Removed from wishlist 💔"
                );
            }

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
                    handleWishlist();

                }}
                className='w-[22px] h-[22px] bg-white md:w-8 md:h-8 lg:w-10 lg:h-10 absolute top-4 right-4 rounded-sm '>
                <div className={`flex justify-center items-center h-full 
            ${inWishlist ? "text-[#FF4646]" : "text-gray-400"} 
            text-[14px] md:text-[22px] lg:text-[27px]`}>
                    <Heart weight={inWishlist ? "fill" : "regular"} />
                </div>
            </div>

            <img src={data.photo} alt="" className="w-full   " />

            <div className="py-6 px-[18px]">
                <h4 className="text-xl font-semibold  mb-2"> {data.title} </h4>
                <p className="text-[#5F5B5B] my-6"> {data.description}</p>

                <div className='flex justify-between '>

                    <div className='flex items-center'>
                        <MapPinLine className=' text-primary text-xl' />
                        <p className='ml-2 text-sm opacity-50'> {data.country} ( {data.city} ) </p>
                    </div>

                    <div className='text-primary text-xl'> ${data.price} </div>

                </div>
            </div>
        </Link>

    )
}



