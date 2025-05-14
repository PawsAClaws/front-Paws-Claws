import React, { useEffect, useState } from 'react';
import login from '../assets/login.png'
import logo from '../assets/logo.png'
import { Globe, Question, Eye, EyeSlash } from "phosphor-react";
import google from '../assets/google.png'
import { toast } from 'react-toastify';
import * as yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BASE_URL, { cookies } from '../lib/api';





export default function Login() {
   const [search,setSearch] = useSearchParams()

    let [errorMsg, setErrorMsg] = useState()
    let navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);



    async function sendLoginData(values) {

        axios.post(`${BASE_URL}/auth/login`, values).then(({ data }) => {

            console.log(data);


            if (data.message == "login success") {

                toast.success("login success")
                const date = new Date()
                date.setDate(date.getDate()+1)
                cookies.set('token', data?.data?.token, { expires: date });
                navigate('/home')
            }


        }).catch(err => {
            console.log(err)
            setErrorMsg(err.response.data.message)
            toast.error(`${err.response.data.message}`)
        })

    }


    const validationSchema = yup.object({


        email: yup.string().email("email is invalid").required("email is required"),
        password: yup.string().required("password is requird").matches(/^[a-zA-Z0-9]{4,}$/, "password must be  at lest 4 carr "),


    })



    let register = useFormik({
        initialValues: {

            email: "",
            password: "",

        },
        validationSchema,


        onSubmit: (values) => {
            console.log(values)
            sendLoginData(values)
        }
    })

    useEffect(()=>{
        if(search.get("token")){
            const date = new Date()
            date.setDate(date.getDate()+1)
            cookies.set("token",search.get("token"),{expires: date})
            navigate("/home")
        }
    },[search])



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

                        <p className='mb-5 font-semibold'>Nice to see you again </p>



                        <div className='flex flex-col mb-4 gap-1.5'>
                            <label className='text-[12px]' htmlFor="email"> Email Address </label>
                            <input value={register.values.email} onBlur={register.handleBlur} onChange={register.handleChange} className='bg-[#F2F2F2] px-3 py-3 rounded-lg' type="email" name="email" id="email" placeholder='Enter your email address' />
                            {register.touched.email && register.errors.email ? <div className='text-red-500 text-[12px]'> {register.errors.email} </div> : null}
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




                        <div className='flex gap-1 items-start justify-between '>
                            <div>
                                <label className="inline-flex items-center mb-5 cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-[#F2F2F2] peer-focus:outline-none    rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:w-5 after:h-5 after:transition-all  peer-checked:bg-primary "></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 "> Remember me </span>
                                </label>

                            </div>
                            <Link to="/forgetPassword"> Forget Password </Link>

                        </div>

                        <div className='flex justify-center items-center mb-10'>
                            <button type='submit' className='bg-primary cursor-pointer  py-2.5 text-white mt-3 rounded-2xl w-[100%]'> Sigin in </button>
                        </div>

                    </form>


                </div>

                <div className='flex flex-col gap-10'>



                    <div className='flex justify-center items-center flex-col   '>
                        <div className='w-[70%] h-[1px] bg-[#E5E5E5] mb-10'></div>
                        <Link to={`${BASE_URL}/auth/google`} className='bg-[#333333] py-2.5 outline-t cursor-pointer  border-[#F2F2F2] rounded-2xl w-[70%] text-white text-center'> <span><img className='inline-block mr-1' src={google} alt="" /></span>  Or Continue with Google </Link>
                    </div>

                    <div className='text-center'> Dont have an account? <span> <Link className='text-primary' to="/register"> Sign up </Link></span> </div>
                </div>

                {setErrorMsg && <div className='text-red-500 text-lg text-center'> {errorMsg} </div>}

            </div>

        </div>
    )
}
