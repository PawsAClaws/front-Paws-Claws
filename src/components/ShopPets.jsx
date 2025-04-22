import React, { useEffect, useState } from "react";
import { fetchPages } from "../lib/PagesApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "phosphor-react";
import Card from './Card';
import { Link } from "react-router-dom";



export default function ShopPets() {

    const shop = "shop";
    const [allShop, setAllShop] = useState([]);


    useEffect(() => {

        const getShopData = async () => {

            try {
                const data = await fetchPages(shop);

                setAllShop(data.posts);

            } catch (error) {
                console.log(error);
            }
        }

        getShopData();
    }, [])


    return (
        <div className=' '>

            <div className=' container mx-auto '>

                <div className='flex justify-between items-center  mt-9'>

                    <h3 className='text-3xl  '>Featured products</h3>
                    <Link to="/shop" className='text-primary cursor-pointer '>See All <ArrowRight className='inline-block ' /></Link>
                </div>

                <Swiper
                    className='swiper-w'
                    spaceBetween={10}
                    slidesPerView={6}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        639: {
                            slidesPerView: 3,
                        },
                        865: {
                            slidesPerView: 3
                        },
                        1000: {
                            slidesPerView: 3
                        },
                        1500: {
                            slidesPerView: 4
                        },
                        1700: {
                            slidesPerView: 5
                        }
                    }}
                >

                    {allShop.map((item, index) => (

                        <SwiperSlide key={index} className='max-w-[300px]' >

                            <Card key={index} data={item} />

                        </SwiperSlide>

                    ))

                    }


                </Swiper>

            </div>

        </div>
    )
}
