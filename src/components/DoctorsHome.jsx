import React, { useEffect, useState } from 'react';
import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, ArrowRight } from "phosphor-react";
import 'swiper/css';
import { fetchDeoctors } from '../lib/PagesApi';

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
                <h3 className='text-3xl  text-center'> doctors </h3>
                <p className='text-primary cursor-pointer text-2xl'>See All <ArrowRight className='inline-block ' /></p>
            </div>

            <Swiper
                spaceBetween={-30}
                breakpoints={{
                    768: {
                        spaceBetween: 20,
                    },
                }}

            >



                <div className='container mx-auto '>

                    {allDoctorsHome.map((doc, index) => (

                        <SwiperSlide key={index} className=' max-w-[300px] md:max-w-[400px]  '>

                            <div className='w-[250px] h-[320px] md:w-[400px] mt-9 md:h-[400px]  overflow-hidden  rounded-lg relative'>

                                <img className='w-full h-1/2 rounded-t-lg' src={doc.card} alt="" />

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
