import React, { useEffect } from 'react';
import imgHome from '../assets/home-img.png'
import { Package, Heart, House, BriefcaseMedical } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import AdoptionPets from '../components/AdoptionPets';
import ShopPets from "../components/ShopPets";
import Featured from "../components/Featured";
import SalePets from "../components/SalePets";
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginAlert } from '../store/loginAlertSlice';





export default function Home() {


    return (

        <>

            <div className='bg-[#F9FAFB]   pt-8 '>

                <div className='  bg-gradient-to-r from-[#F9FAFB] h-[30vh] md:h-[40vh] lg:h-[50vh]    to-[#FF9131] '>

                    <div className=' container h-full  pt-8 mx-auto flex justify-between items-center  relative '>

                        <div className='sm:w-1/2 md:w-1/3 h-full flex gap-6 flex-col justify-center '>
                            <h2 className=' sm:text-xl md:text-3xl lg:text-[56px] font-bold'> Your one-stop care solution </h2>
                            <p className='text-[18px]'> Find veterinarians, shop supplies, adopt pets, or buy and sell in our marketplace. </p>

                            <div className='flex gap-4 '>

                                <Link to="/register" className='bg-[#FF9131]  py-2 px-4 lg:py-3 lg:px-6 text-white rounded-lg cursor-pointer'> Get Started </Link>

                                <Link to="/about" className=' py-2 px-4 lg:py-3 lg:px-6 text-primary border border-primary rounded-lg cursor-pointer'> Learn More </Link>

                            </div>
                        </div>


                        <div className="absolute top-0 right-0 w-1/2 md:w-1/3 sm:w-2/5 max-w-full h-full">
                            <img className="w-full h-full object-contain" src={imgHome} alt="home img" />
                        </div>

                    </div>


                </div >

                <div className='bg-[#F9FAFB] pb-20   '>

                    <h3 className='text-xl md:text-3xl text-center pt-10 pb-8'>Our Services</h3>

                    <div className='container  mx-auto flex justify-center items-center gap-8 h-full flex-col'>



                        {/* all cards */}

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>

                            {/* each card */}

                            <div className='bg-white flex justify-center  flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>

                                <div > <Heart className='text-primary ' /> </div>
                                <h6 className='text-lg'> find veterinarians </h6>
                                <p> connect with qualified pet doctors near you </p>

                            </div>

                            <div className='bg-white flex flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>

                                <div > <Package className='text-primary ' /> </div>
                                <h6 className='text-lg'> find veterinarians </h6>
                                <p> connect with qualified pet doctors near you </p>

                            </div>

                            <div className='bg-white flex flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>

                                <div > <BriefcaseMedical className='text-primary ' /> </div>
                                <h6 className='text-lg'> find veterinarians </h6>
                                <p> connect with qualified pet doctors near you </p>

                            </div>

                            <div className='bg-white flex flex-col gap-3 py-6 px-8 w-[288px] h-[180px] rounded-2xl'>

                                <div > <House className='text-primary ' /> </div>
                                <h6 className='text-lg'> find veterinarians </h6>
                                <p> connect with qualified pet doctors near you </p>

                            </div>

                        </div>

                    </div>

                </div>

                <AdoptionPets />

                <SalePets />

                <ShopPets />

                <Featured />


                {/* {isLoginAlertOpen && (
                    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex justify-center items-center'>
                        <div className='bg-white w-[90%] md:w-[50%] p-6 rounded-2xl flex gap-5 items-center justify-center flex-col relative'>
                            <button className='absolute top-4 right-6 text-2xl' onClick={() => dispatch(closeLoginAlert())}>×</button>
                            <p className="text-xl font-bold">🚪 You're not logged in</p>
                            <p>Please log in to access this feature and explore the full experience of Paws&Claws.</p>

                            <Link to="/login" className='bg-primary text-center py-3 px-6 w-full md:w-1/2 text-white rounded-2xl cursor-pointer'>
                                Log In
                            </Link>

                            <p>Don't have an account?</p>

                            <Link to="/register" className='bg-primary text-center py-3 px-6 w-full md:w-1/2 text-white rounded-2xl cursor-pointer'>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )} */}


            </div >



            <div className='bg-primary'>

                <div className='container mx-auto flex justify-center items-center flex-col h-[250px] gap-6'>

                    <h5 className='text-white text-xl md:text-3xl'>ready to find your perfect pet?</h5>
                    <p className='text-white md:text-[20px]'>join thousands of happy pet owners in our comunity</p>

                    <div className='flex gap-4 '>

                        <Link to="/register" className='bg-white py-3 px-6 text-primary rounded-2xl cursor-pointer'> Get Started </Link>

                        <Link to="/about" className=' py-3 px-6 text-white bg-transparent border border-white rounded-2xl cursor-pointer'> Learn More </Link>

                    </div>

                </div>

            </div>


        </>


    );
}
