import React from 'react';
import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, ArrowRight } from "phosphor-react";
import 'swiper/css';

export default function Featured() {

    return (

        <div className='container mx-auto  '>

            <div className='flex justify-between items-center mt-9'>
                <h3 className='text-3xl  text-center'> doctors </h3>
                <p className='text-primary cursor-pointer '>See All <ArrowRight className='inline-block ' /></p>
            </div>

            <Swiper
                spaceBetween={-30}
                breakpoints={{
                    768: {
                        spaceBetween: 20, // 30px gap on large screens (1024px and above)
                    },
                }}

            >



                <div className='container mx-auto '>

                    {[doc1, doc2, doc1, doc2, doc1, doc2, doc1, doc2, doc1, doc2].map((doc, index) => (

                        <SwiperSlide key={index} className=' max-w-[300px] md:max-w-[400px]  '>

                            <div className='w-[250px] h-[320px] md:w-[400px] mt-9 md:h-[400px]  overflow-hidden  rounded-lg relative'>
                                <img className='w-full rounded-t-lg' src={doc} alt="" />

                                <div className='flex flex-col gap-4  px-4 pt-4 pb-2 border rounded-b-lg border-[#E5E7EB] '>

                                    <h5 className='text-lg font-semibold'>Dr. Emily Brown</h5>
                                    <p className='text-gray-600'>Pet Dermatologist</p>
                                    <div className='flex gap-2 items-center'>
                                        <div className='flex gap-1 text-[#FBBF24]'>
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                        <p>5</p>
                                    </div>
                                    <button className='text-white bg-primary w-full py-2 rounded-2xl'>
                                        Book Appointment
                                    </button>
                                </div>

                            </div>

                        </SwiperSlide>


                    ))}


                </div>

            </Swiper>



        </div>


    );
}
