import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import BASE_URL from '../lib/api'
import google from '../assets/google.png'
import { X } from "lucide-react";

const LoginMessage = () => {


    return (

        <div className='flex justify-center items-center h-screen'>

            <div className='bg-bg-app h-[450px] w-[450px]  md:h-[600px] md:w-[600px] rounded-lg relative'>

                <div>

                    <div className=" flex justify-center flex-col ">

                        <div className='flex justify-center pt-14'>
                            <img className='w-8 lg:w-10' src={logo} alt="logo" />
                            <Link to="home">
                                <h1 className='text-primary text-2xl font-bold'>Paws&Claws</h1>
                            </Link>
                        </div>

                        <p className=' md:text-3xl pt-10 text-center'> Sign in to your paws&claws account </p>



                        <div className='flex justify-center items-center flex-col pt-14 gap-10'>

                            <Link to="/login" className='bg-[#FF9131] text-center   w-[70%] capitalize py-2 px-4 lg:py-3 lg:px-6 text-white rounded-lg cursor-pointer'> Sign in </Link>

                            <Link to={`${BASE_URL}/auth/google`} className='bg-[#333333] py-2.5   cursor-pointer  border-[#F2F2F2] rounded-2xl w-[70%] text-white text-center'> <span><img className='inline-block mr-1' src={google} alt="" /></span>  Or Continue with Google </Link>
                        </div>


                        <div className='text-center pt-20'> Are you new to paws&claws? <span> <Link className='text-primary' to="/register"> Create an account </Link></span> </div>

                    </div>

                </div>

                <Link to="/" className='absolute top-6 right-4 cursor-pointer translate-x-[-50%] translate-y-[-50%]'>
                    <X />
                </Link>

            </div>

        </div>
    )
}

export default LoginMessage