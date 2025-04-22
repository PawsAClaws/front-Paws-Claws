import React from 'react'
import logo from '../../assets/logo.png'
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <div>

            <nav className="bg-white  sticky top-0 z-50 w-full">
                <div className=" container mx-auto py-4 px-6">

                    <div className="flex justify-between  items-center">

                        <div className=" text-md md:text-2xl  items-center  text-gray-800 flex">
                            <img className='w-8 lg:w-10' src={logo} alt="logo" />
                            <h1 className='text-primary'> <Link to="/">Paws&Claws</Link> </h1>
                        </div>

                        {/* <div className="hidden md:flex space-x-6 font-medium tracking-widest">
                            <a href="#" >Home</a>
                            <a href="#" >doctors</a>
                            <a href="#" >shop</a>
                            <a href="#" >adoption</a>
                            <a href="#" >Marketplace</a>
                        </div> */}



                        <div className='flex gap-4'>

                            {/* <div className="md:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
                                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div> */}

                            <div>
                                <Link to="/login" className="bg-primary cursor-pointer text-white py-1 px-2 md:py-3 md:px-6 rounded">Sign in</Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
                        <a href="#" className="block ">Home</a>
                        <a href="#" className="block ">doctors</a>
                        <a href="#" className="block ">shop</a>
                        <a href="#" className="block ">adoption</a>
                        <a href="#" className="block ">Marketplace</a>

                    </motion.div>
                )} */}

            </nav>


        </div>

    )
}
