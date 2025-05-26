import React from "react";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import slide5 from "../assets/slide5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Featured from "../components/DoctorsHome";
import SalePets from "../components/SalePets";
import AdoptionPets from "../components/AdoptionPets";
import ShopPets from "../components/ShopPets";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllWishList } from "../store/wishlist";




export default function HomeLogin() {

    const slides = [slide1, slide2, slide3, slide4, slide5];


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllWishList());
    }, [dispatch]);


    return (

        <div>


            <div className="bg-[#F9FAFB]">
                <div className="w-full container mx-auto  pt-8 ">

                    <div className="w-full mb-8 relative">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            loop={true}
                            className="w-full "
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="absolute bottom-0 md:bottom-[5%] right-[10%] md:right-[5%] z-40">

                            <button className="bg-primary text-sm md:text-md text-white py-2 px-4 md:py-3 md:px-10 cursor-pointer rounded-lg capitalize"> adopt today</button>
                        </div>
                    </div>


                    <div>



                        <AdoptionPets />
                        <SalePets />
                        <ShopPets />
                        <Featured />


                    </div>

                </div>


            </div>

        </div>




    );
}
