import React, { useEffect, useState } from 'react';
import login from '../assets/login.png'
import logo from '../assets/logo.png'
import { Globe, Question, Eye, EyeSlash } from "phosphor-react";
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Location from '../lib/Location';
import { useNavigate } from 'react-router-dom';


export default function Register() {


    const [isAgreed, setIsAgreed] = useState(false)
    let [errorMsg, setErrorMsg] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()




    async function sendRegisterData(values) {

        axios.post(' https://backend-online-courses.onrender.com/api/v1/auth/register', values).then(({ data }) => {




            if (data.message == "user created successfully") {

                toast.success("user created successfully")
                navigate('/login')
            }


        }).catch(err => {
            console.log(err)
            setErrorMsg(err.response.data.message)
            toast.error(`${err.response.data.message}`)
        })

    }


    const validationSchema = yup.object({

        firstName: yup.string().max(20).required("firstName is required"),
        lastName: yup.string().max(20).required("lastName is required"),
        email: yup.string().email("email is invalid").required("email is required"),
        password: yup.string().required("password is requird").matches(/^[a-zA-Z0-9]{4,}$/, "password must be  at lest 4 carr "),
        confirmPassword: yup.string().required("confirmPassword is requird").oneOf([yup.ref('password')], "confirmPassword not matched"),
        gender: yup.string().required("gender is required"),
        location: yup.string().required('location is required'),
        birthday: yup.string().required("birthday is required").matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in YYYY-MM-DD format"),
        phone: yup.string().required("phone is requird").matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")

    })



    let register = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: "",
            birthday: "",
            phone: "",
            location: "",
        },
        validationSchema,


        onSubmit: (values) => {

            sendRegisterData(values)
        }
    })





    return (
        <div className='h-screen bg-cover bg-center relative' style={{ backgroundImage: `url(${login})` }}>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>

            <div className='bg-white w-full absolute top-[30%] md:top-0 right-0 h-[70%] md:h-full md:w-[55%] lg:w-[40%] '>

                <div className='flex justify-between items-center px-8 py-5'>
                    <div className='flex items-center text-3xl'>
                        <img src={logo} alt="logo" />
                        <h1 className='text-primary'> <Link to="/"> Paws&Claws </Link>  </h1>
                    </div>
                    <div className='flex gap-2 text-3xl'>
                        <Globe />
                        <Question />
                    </div>
                </div>

                <div className=' mt-3 flex justify-center items-center '>

                    <form onSubmit={register.handleSubmit} className='w-[70%] ' >

                        <p className='mb-5 font-semibold'>Personal Information </p>

                        <div className='flex gap-2'>
                            <div className='flex flex-col mb-4 w-1/2 gap-1.5 '>
                                <label className='text-[12px]' htmlFor="firstName"> First Name </label>
                                <input value={register.values.firstName} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="text" name="firstName" id="firstName" placeholder='Enter your name' />
                                {register.touched.firstName && register.errors.firstName ? <div className='text-red-500 text-[12px]'> {register.errors.firstName} </div> : null}

                            </div>

                            <div className='flex flex-col mb-4 w-1/2 gap-1.5'>
                                <label className='text-[12px]' htmlFor="lastName"> Last Name </label>
                                <input value={register.values.lastName} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="text" name="lastName" id="lastName" placeholder='Enter your last name' />
                                {register.touched.lastName && register.errors.lastName ? <div className='text-red-500 text-[12px]'> {register.errors.lastName} </div> : null}
                            </div>
                        </div>

                        <div className='flex flex-col mb-4 gap-1.5'>
                            <label className='text-[12px]' htmlFor="email"> Email Address </label>
                            <input value={register.values.email} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="email" name="email" id="email" placeholder='Enter your email address' />
                            {register.touched.email && register.errors.email ? <div className='text-red-500 text-[12px]'> {register.errors.email} </div> : null}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='flex flex-col mb-4 w-1/2 gap-1.5 '>
                                <label className='text-[12px]' htmlFor="gender"> Gender </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="bg-[#F2F2F2] px-3 py-3 rounded-lg"
                                    onChange={register.handleChange}
                                    onBlur={register.handleBlur}
                                    value={register.values.gender}>
                                    <option value="" disabled hidden>Male/female</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {register.touched.gender && register.errors.gender ? <div className='text-red-500 text-[12px]'> {register.errors.gender} </div> : null}
                            </div>

                            <div className='flex flex-col mb-4 w-1/2 gap-1.5'>
                                <label className='text-[12px]' htmlFor="birthday"> Birthday </label>
                                <input value={register.values.birthday} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="date" name="birthday" id="birthday" placeholder='Year-Month-Day' />
                                {register.touched.birthday && register.errors.birthday ? <div className='text-red-500 text-[12px]'> {register.errors.birthday} </div> : null}
                            </div>
                        </div>

                        <div className='flex gap-2 flex-col md:flex-row'>

                            <div className='flex flex-col mb-4 gap-1.5 md:w-1/2'>
                                <label className='text-[12px]' htmlFor="phone"> Phone Number </label>
                                <input value={register.values.phone} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="text" name="phone" id="phone" placeholder='Enter your Phone Number' />
                                {register.touched.phone && register.errors.phone ? <div className='text-red-500 text-[12px]'> {register.errors.phone} </div> : null}
                            </div>

                            <div className='flex flex-col pb-4 md:w-1/2'>
                                <label htmlFor="location"> Location </label>
                                <div className='' >
                                    <Location
                                        onCountryChange={(value) => register.setFieldValue("location", value)}
                                    />
                                </div>
                                {register.touched.location && register.errors.location && (
                                    <p className="text-red-500 text-center text-sm mt-1">{register.errors.location}</p>
                                )}

                            </div>

                        </div>

                        <div className='flex flex-col mb-4 gap-1.5 relative'>
                            <label className='text-[12px]' htmlFor="password"> Password </label>

                            <input
                                value={register.values.password}
                                onBlur={register.handleBlur}
                                onChange={register.handleChange}
                                className='bg-[#F2F2F2] px-3 py-3 rounded-lg pr-10'
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder='Enter your password'
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

                            {register.touched.password && register.errors.password && (
                                <div className='text-red-500 text-[12px]'> {register.errors.password} </div>
                            )}
                        </div>

                        <div className='flex flex-col mb-4 gap-1.5'>
                            <label className='text-[12px]' htmlFor="confirmPassword "> confirm password </label>
                            <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.confirmPassword} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' />
                            {register.touched.confirmPassword && register.errors.confirmPassword ? <div className='text-red-500 text-[12px]'> {register.errors.confirmPassword} </div> : null}

                        </div>







                        <div className='flex gap-1 items-baseline mt-10 '>

                            <input checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} type="checkbox" />

                            <div> <span>By creating an account, I agree to our <span className='text-primary'> <Link to="/terms"> Terms of use </Link> </span> and <span className='text-primary'> <Link to="/policy"> Privacy Policy </Link>  </span> </span> </div>
                        </div>

                        <button disabled={!isAgreed} type='submit' className='bg-primary w-full py-2.5 text-white mt-10 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'> Sigin up </button>

                        {errorMsg && <div className='text-red-500 text-xl text-center'> {errorMsg} </div>}

                        <div className='mt-10 text-center'> Already have an account? <Link to="/login" className='text-primary'>Login now</Link> </div>


                    </form>


                </div>

            </div>

        </div>
    )
}
