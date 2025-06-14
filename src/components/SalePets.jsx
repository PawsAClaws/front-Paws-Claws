import React from "react";
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "phosphor-react";
import Card from "./Card";
import { fetchPages } from "../lib/PagesApi";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import 'swiper/css';

export default function SalePets() {
    const { t } = useTranslation();
    const sell = "sale";

    const {
        data: allSell = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['pets', 'sale'],
        queryFn: async () => {
            const data = await fetchPages(sell);

            return data.posts;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
    });

    // Loading state
    if (isLoading) {
        return (
            <div className='container mx-auto mt-9'>
                <div className='flex justify-between items-center mb-5'>
                    <h3 className="text-xl md:text-3xl font-bold">{t('sliders.SalePets')}</h3>
                    <Link to="/animals" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block' />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg">Loading pets...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        console.error('Error fetching pets:', error);
        return (
            <div className='container mx-auto mt-9'>
                <div className='flex justify-between items-center mb-5'>
                    <h3 className="text-xl md:text-3xl font-bold">{t('sliders.SalePets')}</h3>
                    <Link to="/animals" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block' />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg text-red-500">Error loading pets. Please try again.</div>
                </div>
            </div>
        );
    }

    return (
        <div className=''>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center mt-9 mb-5'>
                    <h3 className="text-xl md:text-3xl font-bold">{t('sliders.SalePets')}</h3>
                    <Link to="/animals" className='text-primary cursor-pointer text-2xl'>
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
                    {allSell.map((item, index) => (
                        <SwiperSlide key={index} className='max-w-[430px]'>
                            <Card key={index} data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}