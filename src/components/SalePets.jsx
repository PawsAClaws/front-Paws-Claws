import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "phosphor-react";
import Card from "./Card";
import { fetchPages } from "../lib/PagesApi";
import { Link } from "react-router-dom";



export default function SalePets() {


    const [allSell, setAllSell] = useState([]);

    const sell = "sale";

    useEffect(() => {

        const getSellData = async () => {

            try {
                const data = await fetchPages(sell);

                console.log(data);

                setAllSell(data.posts);

            } catch (error) {
                console.log(error);
            }
        }

        getSellData();
    }, [])



    return (
        <div className=''>

            <div className=' container mx-auto  '>


                <div className='flex justify-between items-center mt-9 mb-5'>

                    <h3 className={`text-3xl `}> Pets for sale </h3>
                    <Link to="/animals" className='text-primary cursor-pointer text-2xl'>See All <ArrowRight className='inline-block ' /></Link>

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
                            slidesPerView: 5
                        },
                        1500: {
                            slidesPerView: 6
                        },
                        1700: {
                            slidesPerView: 6
                        }
                    }}
                >



                    {allSell.map((item, index) => (

                        <SwiperSlide key={index} className='max-w-[230px]' >

                            <Card key={index} data={item} />

                            {/* <div className=' mt-8 max-w-[230px] bg-white rounded-t-2xl'>

                                <img className='w-full' src={img} alt="" />

                                <div className=' py-4 px-4 flex flex-col gap-3'>

                                    <h6> Cute dog for ado.. </h6>

                                    <div className='flex justify-between '>

                                        <div className='flex items-center'>
                                            <MapPinLine className=' text-primary' />
                                            <p className='ml-2 text-[10px] opacity-50'>California ( 2,5km )</p>
                                        </div>

                                        <div className='text-primary'> 100$ </div>

                                    </div>

                                </div>

                            </div> */}

                        </SwiperSlide>

                    ))

                    }


                </Swiper>

            </div>

        </div>
    )
}
