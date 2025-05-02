import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "phosphor-react";
import { fetchPages } from "../lib/PagesApi";
import Card from "./Card";
import { Link } from "react-router-dom";



export default function AdoptionPets(props) {

    const adoption = "adoption";

    const [allAdoptions, setAllAdoptions] = useState([]);

    useEffect(() => {

        const getAdptionsData = async () => {

            try {
                const data = await fetchPages(adoption);

                setAllAdoptions(data.posts);


            } catch (error) {
                console.log(error);
            }
        }

        getAdptionsData();
    }, [])


    return (
        <div className=''>

            <div className=' container mx-auto  pt-8'>


                <div className='flex justify-between items-center mt-9 mb-5'>

                    <h3 className="text-3xl  "> Pets for sale Adoption  </h3>
                    <Link to="/adoption" className='text-primary cursor-pointer text-2xl'>See All <ArrowRight className='inline-block ' /></Link>

                </div>

                <Swiper

                    spaceBetween={10}
                    slidesPerView={6}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        639: {
                            slidesPerView: 3,
                        },
                        865: {
                            slidesPerView: 3
                        },
                        1000: {
                            slidesPerView: 5
                        },
                        1500: {
                            slidesPerView: 6
                        },
                        1700: {
                            slidesPerView: 6
                        }
                    }}
                >

                    {allAdoptions.map((item, index) => (

                        <SwiperSlide key={index} className='max-w-[230px]' >

                            <Card key={index} data={item} />

                        </SwiperSlide>

                    ))

                    }


                </Swiper>

            </div>

        </div>
    )
}
