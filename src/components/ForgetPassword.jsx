import React, { useState } from 'react';
import login from '../assets/login.png'
import logo from '../assets/logo.png'
import { Globe, Question, Eye, EyeSlash } from "phosphor-react";
import google from '../assets/google.png'
import { toast } from 'react-toastify';
import * as yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';





export default function ForgetPassword() {


    let [errorMsg, setErrorMsg] = useState()

    let [successMsg, setSuccessMsg] = useState(false)




    async function sendLoginData(values) {

        axios.post('https://backend-online-courses.onrender.com/api/v1/password/forgot', values).then(({ data }) => {

            console.log(data);


            if (data.status == "success") {

                setSuccessMsg(true)

            }


        }).catch(err => {
            console.log(err)
        })

    }


    const validationSchema = yup.object({


        email: yup.string().email("email is invalid").required("email is required"),

    })



    let register = useFormik({

        initialValues: {

            email: "",
        },
        validationSchema,


        onSubmit: (values) => {
            console.log(values)
            sendLoginData(values)
        }
    })




    return (
        <div className='h-screen bg-cover bg-center relative' style={{ backgroundImage: `url(${login})` }}>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>

            <div className='bg-white w-full absolute top-[30%] md:top-0 right-0 h-[70%] md:h-full md:w-[55%] lg:w-[40%]  '>

                <div className='flex justify-between items-center px-8 py-5'>
                    <div className='flex items-center text-3xl'>
                        <img src={logo} alt="logo" />
                        <h1 className='text-primary'> <Link to="/">  Paws&Claws </Link> </h1>
                    </div>
                    <div className='flex gap-2 text-3xl'>
                        <Globe />
                        <Question />
                    </div>
                </div>

                <div className=' mt-3 flex justify-center items-center '>

                    <form onSubmit={register.handleSubmit} className='w-[70%] ' >

                        <p className='mb-5 font-semibold text-center'> Forget Password </p>



                        <div className='flex flex-col mb-4 gap-1.5'>
                            <label className='text-[12px]' htmlFor="email"> Email Address </label>
                            <input value={register.values.email} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="email" name="email" id="email" placeholder='Enter your email address' />
                            {register.touched.email && register.errors.email ? <div className='text-red-500 text-[12px]'> {register.errors.email} </div> : null}

                        </div>


                        <div className='flex justify-center items-center mb-10'>
                            <button type='submit' className='bg-primary cursor-pointer  py-2.5 text-white mt-3 rounded-2xl w-[100%]'> Send </button>
                        </div>

                    </form>


                </div>

                <div className='flex flex-col gap-10'>



                    <div className='flex justify-center items-center flex-col   '>
                        <div className='w-[70%] h-[1px] bg-[#E5E5E5] mb-10'></div>
                    </div>

                    <div className='text-center'> Dont have an account? <span> <Link className='text-primary' to="/register"> Sign up </Link></span> </div>
                </div>

                {setErrorMsg && <div className='text-red-500 text-lg text-center'> {errorMsg} </div>}

                {successMsg && <div className='text-center mt-10 text-green-300 text-2xl'> Password reset link sent to your email successfully </div>}

            </div>

        </div>
    )
}
