import React, { useEffect, useState } from 'react';
import imgHome from '../assets/home-img.png'
import { Package, Heart, House, BriefcaseMedical } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShopPets from "../components/ShopPets";
import SalePets from "../components/SalePets";
import DoctorsHome from '../components/DoctorsHome';
import AdoptionPets from '../components/AdoptionPets';
import LoginMessage from '../components/LoginMessage';



export default function Home({ showLoginMessage }) {






    return (
        <>

            <div className={`${showLoginMessage ? 'opacity-30 pointer-events-none' : ''} transition-opacity duration-300`}>
                <div className='bg-[#F9FAFB] pt-8'>
                    <div className='bg-gradient-to-r from-[#F9FAFB] h-[30vh] md:h-[40vh] lg:h-[50vh] relative to-[#FF9131]'>
                        <div className='container h-full gap-5 pt-8 mx-auto flex justify-between items-center'>
                            <div className='w-[60%] sm:w-1/2 xl:w-[40%] h-full flex gap-6 flex-col justify-center'>
                                <h2 className='text-sm md:text-2xl sm:text-[18px] lg:text-3xl lg:text-[56px] font-bold'> Your one-stop care solution </h2>
                                <p className='text-sm md:text-[18px]'> Find veterinarians, shop supplies, adopt pets, or buy and sell in our marketplace. </p>

                                <div className='flex gap-4'>
                                    <Link to="/register" className='bg-[#FF9131] text-[12px] md:text-md py-2 px-4 lg:py-3 lg:px-6 text-white rounded-lg cursor-pointer'> Get Started </Link>
                                    <Link to="/about" className='py-2 px-4 lg:py-3 text-[12px] md:text-md lg:px-6 text-primary border border-primary rounded-lg cursor-pointer'> Learn More </Link>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[20px] right-0 w-2/5 md:w-[40%] h-full">
                            <img className="w-full h-full" src={imgHome} alt="home img" />
                        </div>
                    </div>

                    <div className='bg-[#F9FAFB] pb-20'>
                        <h3 className='text-xl md:text-3xl text-center pt-10 pb-8'>Our Services</h3>

                        <div className='container mx-auto flex justify-center items-center gap-8 h-full flex-col'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                                <div className='bg-white flex justify-center flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>
                                    <div> <Heart className='text-primary' /> </div>
                                    <h6 className='text-lg'> find veterinarians </h6>
                                    <p> connect with qualified pet doctors near you </p>
                                </div>

                                <div className='bg-white flex flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>
                                    <div> <Package className='text-primary' /> </div>
                                    <h6 className='text-lg'> find veterinarians </h6>
                                    <p> connect with qualified pet doctors near you </p>
                                </div>

                                <div className='bg-white flex flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>
                                    <div> <BriefcaseMedical className='text-primary' /> </div>
                                    <h6 className='text-lg'> find veterinarians </h6>
                                    <p> connect with qualified pet doctors near you </p>
                                </div>

                                <div className='bg-white flex flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>
                                    <div> <House className='text-primary' /> </div>
                                    <h6 className='text-lg'> find veterinarians </h6>
                                    <p> connect with qualified pet doctors near you </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AdoptionPets />
                    <SalePets />
                    <ShopPets />
                    <DoctorsHome />
                </div>

                <div className='bg-primary'>
                    <div className='container mx-auto flex justify-center items-center flex-col h-[250px] gap-6'>
                        <h5 className='text-white text-xl md:text-3xl'>ready to find your perfect pet?</h5>
                        <p className='text-white md:text-[20px]'>join thousands of happy pet owners in our comunity</p>

                        <div className='flex gap-4'>
                            <Link to="/register" className='bg-white py-3 px-6 text-primary rounded-2xl cursor-pointer'> Get Started </Link>
                            <Link to="/about" className='py-3 px-6 text-white bg-transparent border border-white rounded-2xl cursor-pointer'> Learn More </Link>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="relative">

                        <LoginMessage />
                    </div>
                </div>
            )}
        </>
    );
}