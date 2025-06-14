import React from "react";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import slide5 from "../assets/slide5.png";
import slide6 from "../assets/slide6.png";
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
import { Link } from "react-router-dom";

export default function HomeLogin() {

    const slides = [
        { img: slide1, h_text: "Find Your Forever Friend", text: "Open your heart and home to a pet in need" },
        { img: slide2, h_text: "Adopt Love, Not Just a Pet", text: "Rescue animals are waiting to give you endless love and loyalty." },
        { img: slide3, h_text: "You Can Change a Life — Maybe Even Two", text: "Adopt a shelter pet and bring joy to both of you." },
        { img: slide4, h_text: "Meet Your New Best Friend", text: "Thousands of pets are ready for love. Could one of them be yours?" },
        { img: slide5, h_text: "Every Paw Deserves a Home", text: "Give a second chance to dogs, cats, and more. Start your adoption journey now." },
        { img: slide6, h_text: "Why Shop When You Can Save a Life?", text: "Adopt, don't shop — make a difference today." },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWishList());
    }, []);



    return (
        <div>
            <div className="bg-[#F9FAFB]">
                <div className="w-full container mx-auto pt-8">
                    <div className="w-full mb-8 relative group">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            loop={true}
                            className="w-full swiper-hidden-nav"
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <img
                                            src={slide.img}
                                            alt={`Slide ${index + 1}`}
                                            className="w-full h-auto object-cover rounded-lg shadow-md"
                                        />

                                        <div className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-lg"></div>

                                        <div className="absolute top-1/2 left-8 md:left-8 lg:left-16 transform -translate-y-1/2 z-30 w-full pr-8 md:pr-16 lg:pr-20">
                                            <h2 className="text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 md:mb-4 drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis">
                                                {slide.h_text}
                                            </h2>
                                            <p className="text-white text-xs md:text-base lg:text-lg drop-shadow-lg leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
                                                {slide.text}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="absolute bottom-0 md:bottom-[5%] right-[10%] md:right-[5%] z-40">
                            <Link to="/adoption" className="bg-primary text-sm md:text-md text-white py-2 px-4 md:py-3 md:px-10 cursor-pointer rounded-lg capitalize">
                                adopt today
                            </Link>
                        </div>

                        {/* Custom CSS for hiding/showing navigation arrows */}

                        <style >{`
                            .group .swiper-button-next,
                            .group .swiper-button-prev {
                                opacity: 0;
                                transition: opacity 0.3s ease;
                            }
                            
                            .group:hover .swiper-button-next,
                            .group:hover .swiper-button-prev {
                                opacity: 1;
                            }
                        `}</style>

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