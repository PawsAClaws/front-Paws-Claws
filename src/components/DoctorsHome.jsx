import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, ArrowRight } from "phosphor-react";
import 'swiper/css';
import { fetchDeoctors } from '../lib/PagesApi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DoctorsHome() {

    const { t } = useTranslation();

    const {
        data: allDoctorsHome = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['doctors', 'home'],
        queryFn: async () => {
            const data = await fetchDeoctors();

            return data.doctors;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
    });

    // Loading state
    if (isLoading) {
        return (
            <div className='container mx-auto pb-16'>
                <div className='flex justify-between items-center mt-9 mb-5'>
                    <h3 className='text-xl md:text-3xl font-bold capitalize'>{t('sliders.Doctors')}</h3>
                    <Link to="/doctors" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block' />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg">Loading doctors...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        console.error('Error fetching doctors:', error);
        return (
            <div className='container mx-auto pb-16'>
                <div className='flex justify-between items-center mt-9 mb-5'>
                    <h3 className='text-xl md:text-3xl font-bold capitalize'>{t('sliders.Doctors')}</h3>
                    <Link to="/doctors" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block' />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg text-red-500">Error loading doctors. Please try again.</div>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto pb-16'>
            <div className='flex justify-between items-center mt-9 mb-5'>
                <h3 className='text-xl md:text-3xl font-bold capitalize'>{t('sliders.Doctors')}</h3>
                <Link to="/doctors" className='text-primary cursor-pointer text-2xl'>
                    See All <ArrowRight className='inline-block' />
                </Link>
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
                {allDoctorsHome.map((doc, index) => (
                    <SwiperSlide key={index} className='max-w-[430px]'>
                        <div className='mt-9 w-full h-full overflow-hidden rounded-lg relative'>
                            <img
                                className='w-full h-[300px] rounded-t-lg'
                                src={doc.card}
                                alt={doc.realName}
                            />

                            <div className='flex flex-col gap-4 px-4 pt-4 pb-2 border rounded-b-lg border-[#E5E7EB]'>
                                <Link to={`/doctorDetail/${doc.id}`}>
                                    <h5 className='text-lg font-semibold'>Dr. {doc.realName}</h5>
                                    <p className='text-gray-600'>speciality {doc.speciality}</p>
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
                                </Link>

                                <Link
                                    to="/booking"
                                    state={{ doctorId: doc.id }}
                                    className='bg-primary text-center rounded-[8px] w-[90%] text-white py-2.5 mt-5 cursor-pointer'
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}