import React from 'react';
import { useSelector } from "react-redux";

import Card from '../components/Card';

const MyWishLists = () => {

    const wishlistItems = useSelector((state) => state.getWishlist.items);





    return (


        <div className="bg-[#F9FAFB] pb-16">

            <div className='container mx-auto'>

                <div className='text-3xl  py-10 text-center'>
                    <h4 > My Wishlists </h4>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

                    {wishlistItems.map((item, index) => (

                        <Card key={index} data={item.post} />

                    ))}

                </div>


            </div>



        </div>
    )
}

export default MyWishLists