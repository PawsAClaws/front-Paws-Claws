import React from 'react'
import logo from '../assets/logo.png'
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CaretDown, Heart, Globe } from "phosphor-react";
import avatar from '../assets/avatar.png'
import flag from '../assets/US flag.svg'
import { NavLink } from 'react-router-dom';






export default function NavbarLogin() {

    const [isOpen, setIsOpen] = useState(false);





    return (

        <div>

            <header className="bg-white  sticky top-0 z-50 w-full ">

                <div className=" container mx-auto py-3 px-6">

                    <div className="flex justify-between  items-center">

                        <div className=" text-md md:text-2xl  items-center  text-gray-800 flex">
                            <img className='w-8 lg:w-10' src={logo} alt="logo" />
                            <h1 className='text-primary'>Paws&Claws </h1>

                        </div>

                        <div className='hidden lg:flex items-center gap-1'>

                            <div> <img src={flag} alt="" /> </div>
                            {/* <div>
                                <div className='text-[#616161]'>  Deliver to <span> <CaretDown className='inline-block' /> </span> </div>
                                <div> 4140 Parker Rd. Allentown... </div>
                            </div> */}

                        </div>

                        <div className="relative border border-[#FBF0E7] rounded-lg w-[150px] md:w-[288px]">

                            <div className="absolute inset-y-0.5 end-0 rounded-lg  text-white w-8 h-8 bg-primary flex items-center ps-3 pointer-events-none justify-items-start">
                                <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                            <input type="search" id="default-search" className="block w-full p-2 ps-4 text-sm " placeholder="Search" />
                        </div>

                        <div className=' gap-3 hidden lg:flex'>

                            <div className='border-e-black border-e pe-1.5'>
                                <p>العربية</p>
                            </div>

                            <div className='text-primary border-e-black border-e pe-1.5'>
                                wishlist <span> <Heart className='inline-block ms-1' /> </span>
                            </div>



                        </div>


                        <div className=' gap-[18px] hidden lg:flex'>

                            <div className='w-14 h-14 rounded-full '>
                                <img src={avatar} alt="avatar" />
                            </div>

                            <div>
                                <p>hi Sam</p>
                                <a className='text-primary' href="#"> my account </a>
                            </div>

                        </div>



                        <div className='flex gap-4'>
                            <div className="lg:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
                                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="lg:hidden bg-white shadow-md py-4  space-y-4">

                            <div className='bg-[#FF9131] py-4 px-3 flex-wrap gap-y-2 flex items-center justify-between'>

                                <div className='flex items-center gap-1 '>

                                    <div> <img src={flag} alt="" /> </div>
                                    <div>
                                        <div className='text-[#616161]'>  Deliver to <span> <CaretDown className='inline-block' /> </span> </div>
                                        <div> 4140 Parker Rd. Allentown... </div>
                                    </div>
                                </div>

                                <div className='flex gap-1.5'> <span className=' text-xl md:text-2xl'>العربية</span> <span> <Globe className='inline-block text-2xl md:text-3xl' /></span> </div>

                                <div className=' gap-[18px] items-center flex ml-auto sm:ml-0'>

                                    <div>
                                        <p className='text-white'> Sam</p>

                                    </div>

                                    <div className='w-14 h-14 rounded-full '>
                                        <img src={avatar} alt="avatar" />
                                    </div>



                                </div>


                            </div>

                            <div className='px-6 flex flex-col gap-6'>
                                <a href="#" className="block ">Home</a>
                                <a href="#" className="block ">doctors</a>
                                <a href="#" className="block ">shop</a>
                                <a href="#" className="block ">adoption</a>
                                <a href="#" className="block ">Marketplace</a>
                            </div>

                        </motion.div>
                    )
                }


                {/* links */}


                <div className='bg-[#FBF0E7]'>

                    <div className='container mx-auto'>

                        <ul className='hidden lg:flex gap-10 py-[18px]'>
                            <li> <NavLink to="/home">Home</NavLink> </li>
                            <li><NavLink to="animals">Animals</NavLink></li>
                            <li><NavLink to="adoption">Adoption</NavLink></li>
                            <li><NavLink to="shop">shop</NavLink></li>
                            <li><NavLink to="marketplace">marketplace</NavLink></li>
                            <li><NavLink to="doctor">doctor</NavLink></li>
                            {/* <li><NavLink to="#"> nearest vet</NavLink></li>
                            <li><NavLink to="#"> events</NavLink></li>
                            <li><NavLink to="#"> training videos</NavLink></li> */}


                        </ul>

                    </div>
                </div>


            </header >

        </div >
    )
}
