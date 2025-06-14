import React, { useState } from 'react';
import login from '../assets/login.png'
import logo from '../assets/logo.png'
import { Globe, Question, Eye, EyeSlash } from "phosphor-react";
import google from '../assets/google.png'
import { toast } from 'react-toastify';
import * as yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom';





export default function ResetPassword() {


    let [errorMsg, setErrorMsg] = useState()

    let [successMsg, setSuccessMsg] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const { token } = useParams()



    async function sendLoginData(values) {

        axios.post('https://backend-online-courses.onrender.com/api/v1/password/reset', values, {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }

        }).then(({ data }) => {





            if (data.status == "success") {
                setSuccessMsg(true)
                navigate('/login')
                toast.success("password reset successfully")

            }


        }).catch(err => {
            console.log(err)
        })

    }


    const validationSchema = yup.object({


        newPassword: yup.string().required("newPassword is requird").matches(/^[a-zA-Z0-9]{4,}$/, "newPassword must be  at lest 4 carr "),

    })



    let register = useFormik({

        initialValues: {

            newPassword: "",
        },
        validationSchema,


        onSubmit: (values) => {

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



                        <div className='flex flex-col mb-4 gap-1.5 relative'>
                            <label className='text-[12px]' htmlFor="newPassword"> New Password </label>

                            <input
                                value={register.values.newPassword}
                                onBlur={register.handleBlur}
                                onChange={register.handleChange}
                                className='bg-[#F2F2F2] px-3 py-3 rounded-lg pr-10'
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                placeholder='Enter your newPassword'
                            />


                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-[38px] cursor-pointer text-gray-500'
                            >
                                {showPassword ? (
                                    <EyeSlash size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </div>

                            {register.touched.newPassword && register.errors.newPassword && (
                                <div className='text-red-500 text-[12px]'> {register.errors.newPassword} </div>
                            )}
                        </div>




                        <div className='flex justify-center items-center mb-10'>
                            <button type='submit' className='bg-primary cursor-pointer  py-2.5 text-white mt-3 rounded-2xl w-[100%]'> Submit </button>
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

                {successMsg && <div className='text-center mt-10 text-green-300 text-2xl'> Password reset successfully </div>}

            </div>

        </div>
    )
}
