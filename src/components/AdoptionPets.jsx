import React from "react";
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "phosphor-react";
import { fetchPages } from "../lib/PagesApi";
import Card from "./Card";
import { Link } from "react-router-dom";
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';


export default function AdoptionPets() {

    const { t } = useTranslation();

    const adoption = "adoption";

    const {
        data: adoptionsData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['adoptions', adoption],
        queryFn: () => fetchPages(adoption),
        select: (data) => data?.posts || [],
        staleTime: Infinity,
        cacheTime: 30 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });

    if (isLoading) return <Loading />;

    if (error) {
        console.error('Error fetching adoptions:', error);
        return <div>Error loading adoptions data</div>;
    }

    const allAdoptions = adoptionsData || [];

    return (
        <div className=''>
            <div className=' container mx-auto  pt-8'>
                <div className='flex justify-between items-center mt-9 mb-5'>
                    <h3 className=" text-xl md:text-3xl font-bold"> {t('sliders.AdoptionPets')}  </h3>
                    <Link to="/adoption" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block ' />
                    </Link>
                </div>

                <Swiper
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
                    {allAdoptions.map((item, index) => (
                        <SwiperSlide key={index} className='max-w-[430px]'>
                            <Card key={index} data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}