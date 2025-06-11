import React, { useEffect } from 'react'
import deal from '../assets/deal.png'
import security from '../assets/security.png'
import { useState } from "react";
import { Image } from "phosphor-react";
import 'react-phone-number-input/style.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { fetchCategoryById } from '../lib/categoryApi';
import BASE_URL, { cookies } from '../lib/api';
import Loading from "../components/Loading";
import Location from '../lib/Location';
import { interval } from 'date-fns';



export default function CreatePost() {



    const [categoriesId, setCategoriesId] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const { id } = useParams();

    useEffect(() => {

        const getIdData = async () => {

            try {

                const data = await fetchCategoryById(id);
                setCategoriesId(data);
                console.log(data);

            } catch (error) {

                console.log(error);
            }
            finally {
                setIsLoading(false);
            }

        }


        getIdData();


    }, [])


    console.log(categoriesId);



    async function handleCreatePost(values) {

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('type', values.type);
        formData.append('gender', values.gender);
        formData.append('age', values.age);
        formData.append('photo', values.photo);
        formData.append('weight', values.weight);
        formData.append('negotiable', values.negotiable);
        formData.append('country', values.country);
        formData.append('city', values.city);
        if (values.categoryId) {
            formData.append('categoryId', values.categoryId);
        } else {
            console.error("categoryId is missing", values.categoryId);
        }


        try {

            const token = cookies.get("token");

            const res = await axios.post(`${BASE_URL}/post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            },)

            console.log(res.data);



            navigate('/alertCard', { state: { message: "Paw-some! Your ad was uploaded successfully." } });

            toast.success("Post created successfully!");

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again.");
        }
    }

    const validationSchema = Yup.object({

        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number()
            .when('type', {
                is: (val) => val !== 'adoption',
                then: (schema) => schema.required('Price is required').min(1, 'Price must be greater than 0'),
                otherwise: (schema) => schema.notRequired(),
            }),
        type: Yup.string().oneOf(['sale', 'adoption', 'shop']),
        gender: Yup.string().required('Gender is required'),
        age: Yup.number().required('Age is required').positive().integer(),
        weight: Yup.string().required('Weight is required'),
        country: Yup.string().required('Country is required'),
        city: Yup.string().required('City is required'),
        categoryId: Yup.string().required('Category is required'),
        photo: Yup.mixed().required('Photo is required'),

    })


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            description: '',
            price: '0',
            type: 'sale',
            gender: 'male',
            age: '1',
            photo: null,
            weight: '0',
            country: '',
            city: '',
            categoryId: '5',
            negotiable: false,
        },

        validationSchema,
        onSubmit: (values) => {

            console.log(values);
            handleCreatePost(values)

        }
    });


    if (isLoading || !categoriesId?.id) return <Loading />;



    return (

        <div className='bg-[#E5E7EB] '>

            <div className='container mx-auto '>

                <h5 className='text-xl text-center py-[26px]'> What are you offering? </h5>

                <div>




                    <form onSubmit={formik.handleSubmit} >


                        <div>
                            <p className='mb-3'> category </p>

                            <div className='flex justify-between'>

                                <Link to={'/categories'} className='flex curson-pointer gap-3.5 items-center'>
                                    <img className='bg-primary' src={categoriesId.photo} alt="category img" />
                                    <div>
                                        <p>{categoriesId.name}</p>
                                    </div>
                                </Link>

                                <div className="bg-[#EFEFEF] px-2 flex justify-around items-center  w-[60%] md:w-[30%]  rounded-[90px] mt-3.5">

                                    {["sale", "adoption", "shop"].map((type) => (
                                        <div
                                            key={type}

                                            onClick={() => formik.setFieldValue("type", type)}
                                            className={`py-2.5 cursor-pointer flex items-center justify-center w-1/3 rounded-[90px] transition-all duration-500 ${formik.values.type === type ? "bg-primary text-white" : "bg-transparent text-black"
                                                }`}
                                        >
                                            <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                                        </div>
                                    ))}

                                </div>

                            </div>


                        </div>

                        <div className="pr-4 mt-2 ">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-72 md:h-[500px] xl:h-[750px]  border-border-light border rounded-lg cursor-pointer bg-gray-50  mt-4"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">

                                    <div className="mb-2 flex items-center flex-col gap-2 text-sm px-14 text-center ">

                                        <div> <Image className='text-[70px] text-[#999999]' /> </div>
                                        <button onClick={() => document.getElementById('dropzone-file').click()} type='button' className='text-white cursor-pointer bg-primary py-3 px-[30px] rounded-sm'> Add images </button>

                                        <p className='text-[#7A7A7A]'>5MB maximum file size accepted in the following formats:.jpg .jpeg png.gif</p>

                                    </div>

                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden "

                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files[0];
                                        formik.setFieldValue('photo', file);
                                    }}
                                />
                            </label>
                            {formik.touched.photo && formik.errors.photo && (
                                <p className="text-red-500 text-center text-sm mt-1">{formik.errors.photo}</p>
                            )}
                        </div>

                        <div className={`flex justify-between gap-7 mt-8 md:w-[50%] ${formik.values.type === 'shop' ? 'hidden' : ''}`}>

                            <div className='flex flex-col mb-4'>
                                <label htmlFor="gender"> Gender </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="bg-white px-3 py-3 rounded-lg "
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.gender}
                                >
                                    <option value="" disabled hidden>Male/female</option>
                                    <option>male</option>
                                    <option>female</option>

                                </select>
                                {formik.touched.gender && formik.errors.gender && (
                                    <p className="text-red-500 text-center text-sm mt-1">{formik.errors.gender}</p>
                                )}
                            </div>

                            <div className='flex flex-col mb-4 '>
                                <label htmlFor="age"> Age </label>
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} className='border w-full sm:max-w-[150px]  p-2.5 border-[#828282] bg-white rounded-sm' type="number" name="age" id="age" placeholder='Enter age' />
                                {formik.touched.age && formik.errors.age && (
                                    <p className="text-red-500 text-center text-sm mt-1">{formik.errors.age}</p>
                                )}
                            </div>


                            <div className='flex flex-col mb-4 '>
                                <label htmlFor="weight"> Weight </label>
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.weight} className='border p-2.5 w-full sm:max-w-[150px] border-[#828282] bg-white rounded-sm' type="number" name="weight" id="weight" placeholder='Enter in KG' />
                                {formik.touched.weight && formik.errors.weight && (
                                    <p className="text-red-500 text-center text-sm mt-1">{formik.errors.weight}</p>
                                )}
                            </div>

                        </div>

                        <div className='bg-[#C2C2C2] h-[1px] my-[30px]'></div>

                        <div className='flex flex-col md:flex-row items-center justify-between'>

                            <div className='flex flex-col pb-4 w-full md:w-[50%]'>
                                <label htmlFor="title"> Ad title  </label>
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} className='border   p-[18px] border-[#828282] bg-white rounded-sm' type="text" name="title" id="title" placeholder='Enter title' />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-red-500 text-center text-sm mt-1">{formik.errors.title}</p>
                                )}
                            </div>


                            <div className='flex flex-col pb-4 w-full md:w-[40%]'>
                                <label htmlFor="country"> Location </label>
                                <div className='' >

                                    <Location
                                        onCountryChange={(value) => formik.setFieldValue("country", value)}
                                        onCityChange={(value) => formik.setFieldValue("city", value)}
                                    />
                                </div>
                                {formik.touched.country && formik.errors.country && (
                                    <p className="text-red-500 text-center text-sm mt-1">{formik.errors.country}</p>
                                )}
                                {formik.touched.city && formik.errors.city && (
                                    <p className="text-red-500 text-center text-sm mt-1">{formik.errors.city}</p>
                                )}

                            </div>




                        </div>

                        <div className='mt-2'>
                            <label htmlFor="description" className=" inline-block w-full">Description</label>

                            <textarea

                                id="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                cols={30}
                                rows={10}
                                className='w-full border   p-[18px] border-[#828282] bg-white rounded-sm  resize-none'
                                placeholder="Describe the item you are selling"
                            />

                            {formik.touched.description && formik.errors.description && (
                                <p className="text-red-500 text-center text-sm mt-1">{formik.errors.description}</p>
                            )}
                        </div>



                        <div className='bg-[#C2C2C2] h-[1px] mt-[30px]'></div>



                        <div className='flex flex-col pb-1.5 mt-8 w-[30%]'>
                            <label htmlFor="price"> Price * </label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                disabled={formik.values.type === 'adoption'}
                                className={`
                                    border p-[18px] border-[#828282] bg-white rounded-sm 
                                    ${formik.values.type === 'adoption' ? 'opacity-50 cursor-not-allowed' : ''}
                                  `}
                                type="text"
                                name="price"
                                id="price"
                            />

                            {formik.touched.price && formik.errors.price && (
                                <p className="text-red-500 text-center text-sm mt-1">{formik.errors.price}</p>
                            )}
                        </div>

                        <div className='flex gap-7 mt-4'>
                            <div className='text-[#929292] flex items-center gap-2'>
                                <input
                                    type="radio"
                                    id="negotiable"
                                    name="negotiable"
                                    checked={formik.values.negotiable === true}
                                    onChange={() => formik.setFieldValue("negotiable", true)}
                                />
                                <label htmlFor="negotiable">Negotiable</label>
                            </div>

                            <div className='text-[#929292] flex items-center gap-2'>
                                <input
                                    type="radio"
                                    id="not-negotiable"
                                    name="negotiable"
                                    checked={formik.values.negotiable === false}
                                    onChange={() => formik.setFieldValue("negotiable", false)}
                                />
                                <label htmlFor="not-negotiable">Not negotiable</label>
                            </div>
                        </div>



                        <div className='flex justify-center mt-12'>
                            <button type='submit' className='bg-primary capitalize cursor-pointer w-full md:w-[40%] lg:w-[30%] mb-7 text-white rounded-[8px] px-4 py-3'> post your ad </button>

                        </div>


                    </form>


                </div>


            </div>

            <div className='bg-[#FBF0E7]  py-7 px-3.5 '>

                <div className='container mx-auto'>

                    <div className='flex justify-between'>

                        <p className='w-[40%]  text-[14px]'>
                            Need help getting started? <br />
                            Review these resource to learn how to create a great ad and increase your selling chances
                            Tips for improving your ads and your chances of selling
                            All you need to know about Posting Ads
                            You can always come back to change your ad
                        </p>

                        <div className='mt-[38px] flex items-center justify-center gap-2.5'>

                            <img src={security} alt="security icon" />

                            <img src={deal} alt="deal icon" />

                        </div>
                    </div>


                </div>

            </div>

        </div>



    )
}
