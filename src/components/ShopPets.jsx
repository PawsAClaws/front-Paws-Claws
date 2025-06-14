import React from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchPages } from "../lib/PagesApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "phosphor-react";
import Card from './Card';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ShopPets() {
    const { t } = useTranslation();
    const shop = "shop";

    const {
        data: allShop = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['pets', 'shop'],
        queryFn: async () => {
            const data = await fetchPages(shop);
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
                    <h3 className='text-3xl'>{t('sliders.ShopPets')}</h3>
                    <Link to="/shop" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block' />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg">Loading products...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        console.error('Error fetching shop products:', error);
        return (
            <div className='container mx-auto mt-9'>
                <div className='flex justify-between items-center mb-5'>
                    <h3 className='text-3xl'>{t('sliders.ShopPets')}</h3>
                    <Link to="/shop" className='text-primary cursor-pointer text-2xl'>
                        See All <ArrowRight className='inline-block' />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg text-red-500">Error loading products. Please try again.</div>
                </div>
            </div>
        );
    }
    ;


    return (
        <div className=''>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center mb-5 mt-9'>
                    <h3 className='text-3xl'>{t('sliders.ShopPets')}</h3>
                    <Link to="/shop" className='text-primary cursor-pointer text-2xl'>
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
                    {allShop.map((item, index) => (
                        <SwiperSlide key={index} className='max-w-[430px]'>
                            <Card key={index} data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}