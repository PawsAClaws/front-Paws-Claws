import React from "react";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Featured from "../components/Featured";
import SalePets from "../components/SalePets";
import History from "../components/History";
import AdoptionPets from "../components/AdoptionPets";
import ShopPets from "../components/ShopPets";

;



export default function HomeLogin() {

    const slides = [slide1, slide2, slide3];

    return (

        <div>


            <div className="bg-[#F9FAFB]">
                <div className="w-full container mx-auto  pt-8 ">

                    <div className="w-full mb-8  ">
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
                    </div>


                    <div>

                        {/* History */}

                        <History />

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
