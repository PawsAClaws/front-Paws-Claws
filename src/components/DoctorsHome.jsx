import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, ArrowRight } from "phosphor-react";
import 'swiper/css';
import { fetchDeoctors } from '../lib/PagesApi';
import { Link } from 'react-router-dom';

export default function DoctorsHome() {


    const [allDoctorsHome, setAllDoctorsHome] = useState([]);



    useEffect(() => {

        const getDoctorsData = async () => {

            try {
                const data = await fetchDeoctors();

                setAllDoctorsHome(data.doctors);


            } catch (error) {
                console.log(error);
            }
        }

        getDoctorsData();
    }, [])

    console.log(allDoctorsHome);



    return (

        <div className='container mx-auto pb-16'>

            <div className='flex justify-between items-center mt-9 mb-5'>
                <h3 className='text-xl md:text-3xl font-bold capitalize'> doctors </h3>
                <Link to="/doctors" className='text-primary cursor-pointer text-2xl'>See All <ArrowRight className='inline-block ' /></Link>
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
                        slidesPerView: 1,
                    },
                    639: {
                        slidesPerView: 2,
                    },
                    865: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3
                    },
                    1500: {
                        slidesPerView: 5
                    },
                    1700: {
                        slidesPerView: 5
                    }
                }}
            >



                <div className='container mx-auto '>

                    {allDoctorsHome.map((doc, index) => (

                        <SwiperSlide key={index} className=' max-w-[430px]  '>

                            <div className=' mt-9 w-full h-full  overflow-hidden  rounded-lg relative'>

                                <img className='w-full h-[300px] rounded-t-lg' src={doc.card} alt={doc.realName} />

                                <div className='flex flex-col gap-4  px-4 pt-4 pb-2 border rounded-b-lg border-[#E5E7EB] '>

                                    <h5 className='text-lg font-semibold'> Dr. {doc.realName} </h5>
                                    <p className='text-gray-600'> speciality {doc.speciality} </p>
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
                                    <button className='text-white cursor-pointer bg-primary w-full py-2 rounded-2xl'>
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
