import React, { useState } from 'react'
import { Paperclip } from "phosphor-react";
import { useDispatch } from 'react-redux';
import { togleCard } from '../store/becomeDoctorSlice';
import { useFormik } from 'formik';
import axios from 'axios';
import baseUrl from '../lib/api';
import * as yup from 'yup'
import { toast } from 'react-toastify';





const BecomeDoctor = () => {

    const [isOpen, setIsOpen] = useState(false);
    let [errorMsg, setErrorMsg] = useState()

    const [selectedDays, setSelectedDays] = useState(['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dispatch = useDispatch()

    const toggleDropdown = () => setIsOpen(!isOpen);

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    function formatTo12Hour(time24) {
        const [hour, minute] = time24.split(':');
        const hourNum = parseInt(hour);
        const period = hourNum >= 12 ? 'pm' : 'am';
        const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
        return `${hour12}:${minute}${period}`;
    }


    const validationSchema = yup.object({
        realName: yup.string().required('Full name is required'),
        bio: yup.string().required('Bio is required'),
        address: yup.string().required('Address is required'),
        price: yup
            .number()
            .typeError('Price must be a number')
            .positive('Price must be positive')
            .required('Price is required'),
        experience: yup.string().required('Experience is required'),
        speciality: yup.string().required('Speciality is required'),
        numOfReservat: yup
            .number()
            .typeError('Number of reservations must be a number')
            .positive('Must be greater than 0')
            .required('Number of reservations is required'),
        startTimeWork: yup.string().required('Start time is required'),
        endTimeWork: yup.string().required('End time is required'),
        card: yup.mixed().required('License image is required'),
    });


    async function handleDoctorData(values) {
        const token = localStorage.getItem('token');

        const startFormatted = formatTo12Hour(values.startTimeWork);
        const endFormatted = formatTo12Hour(values.endTimeWork);

        const formData = new FormData();

        formData.append('realName', values.realName);
        formData.append('bio', values.bio);
        formData.append('address', values.address);
        formData.append('price', values.price);
        formData.append('experience', values.experience);
        formData.append('speciality', values.speciality);
        formData.append('numOfReservat', values.numOfReservat);
        formData.append('startTimeWork', startFormatted);
        formData.append('endTimeWork', endFormatted);
        formData.append('daysWork', selectedDays.join(','));
        if (values.card) {
            formData.append('card', values.card);
        }

        try {
            const res = await axios.post(`${baseUrl}/doctor`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            toast.success("Your request sent successfully")
        } catch (err) {
            console.error('Error sending doctor data:', err);
            toast.error(`${err.response.data.message}`)
            setErrorMsg(err.response.data.message)
        }
    }




    const formik = useFormik({

        initialValues: {
            bio: '',
            address: '',
            price: '',
            experience: '',
            speciality: '',
            numOfReservat: '',
            daysWork: '',
            startTimeWork: '',
            endTimeWork: '',
            card: '',
            realName: '',

        },
        validationSchema,

        onSubmit: (values) => {
            console.log(values);

            handleDoctorData(values)

        },

    })





    return (


        <div >

            <form onSubmit={formik.handleSubmit} className='text-sm rounded-2xl ' >

                <div className='bg-white px-8 py-7'>
                    <h5 className='text-md md:text-xl'> became a doctor </h5>
                </div>


                <div className='flex flex-col gap-8 bg-[#F3F4F8] p-8'>

                    <div className='flex flex-col md:flex-row gap-4 '>

                        <div className='flex gap-2.5 flex-col w-full'>

                            <label className='capitalize' htmlFor="realName"> full name </label>

                            <input className='py-5 w-full  border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='realName'
                                id='realName'
                                placeholder='Enter real your name'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.realName}
                            />
                            {formik.touched.realName && formik.errors.realName ? <div className='text-red-500 text-[12px]'> {formik.errors.realName} </div> : null}

                        </div>

                        <div className='flex gap-2.5 flex-col w-full'>
                            <label className='capitalize' htmlFor="address"> address </label>

                            <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='address'
                                id='address'
                                placeholder='Enter your address'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                            {formik.touched.address && formik.errors.address ? <div className='text-red-500 text-[12px]'> {formik.errors.address} </div> : null}

                        </div>


                    </div>

                    <div className='flex flex-col md:flex-row gap-4 '>



                        <div className='flex gap-2.5 flex-col w-full'>

                            <label className='capitalize' htmlFor="bio"> Bio </label>

                            <input className='py-5 w-full  border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='bio'
                                id='bio'
                                placeholder='Enter your Bio'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                            />
                            {formik.touched.bio && formik.errors.bio ? <div className='text-red-500 text-[12px]'> {formik.errors.bio} </div> : null}

                        </div>

                        <div className='flex gap-2.5 flex-col w-full'>
                            <label className='capitalize' htmlFor="speciality "> speciality </label>

                            <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='speciality'
                                id='speciality'
                                placeholder='Enter your speciality (dogs-cats-birds)'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.speciality}
                            />
                            {formik.touched.speciality && formik.errors.speciality ? <div className='text-red-500 text-[12px]'> {formik.errors.speciality} </div> : null}

                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 '>

                        <div className='flex gap-2.5 flex-col w-full'>

                            <label className='capitalize' htmlFor="experience"> experience </label>

                            <input className='py-5 w-full  border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='experience'
                                id='experience'
                                placeholder='Enter real your name'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.experience}
                            />
                            {formik.touched.experience && formik.errors.experience ? <div className='text-red-500 text-[12px]'> {formik.errors.experience} </div> : null}

                        </div>

                        <div className='flex gap-2.5 flex-col w-full'>
                            <label className='capitalize' htmlFor="card">License</label>

                            <div className="relative w-full">
                                <input
                                    type="file"
                                    id="card"
                                    name="card"
                                    accept="image/*"
                                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                    onChange={(e) => {
                                        formik.setFieldValue("card", e.currentTarget.files[0]);
                                    }}
                                />
                                {formik.touched.card && formik.errors.card ? <div className='text-red-500 text-[12px]'> {formik.errors.card} </div> : null}

                                <div className="flex items-center justify-between py-5 px-4 border-[0.2px] border-gray-300 rounded-[8px] bg-[#F2F2F2]  cursor-pointer">
                                    <span className='capitalize'>Upload license image</span>
                                    <Paperclip className="text-xl text-[#00A0FF]" />
                                </div>
                            </div>
                        </div>


                        <div className='flex gap-2.5 flex-col w-full'>
                            <label className='capitalize' htmlFor="numOfReservat"> number of reservations  </label>

                            <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='numOfReservat'
                                id='numOfReservat'
                                placeholder='How many reservations you want to take'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.numOfReservat}
                            />
                            {formik.touched.numOfReservat && formik.errors.numOfReservat ? <div className='text-red-500 text-[12px]'> {formik.errors.numOfReservat} </div> : null}

                        </div>


                    </div>



                    <div className='flex flex-col md:flex-row gap-4'>

                        <div className='flex gap-2.5 flex-col w-full md:w-1/3'>

                            <label htmlFor="startTimeWork"> Working hours </label>

                            <div className='flex border-[0.2px] border-gray-300 bg-[#F2F2F2] rounded-[8px] w-full'>

                                <div className='flex items-center px-2 text-[#5E5E5E]'>
                                    From
                                    <input className='py-5 w-1/2  border-[0.2px] rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none border-none'
                                        type="time"
                                        name='startTimeWork'
                                        id='startTimeWork'
                                        placeholder='8 Am'
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.startTimeWork}
                                    />

                                </div>

                                <div className='flex items-center px-2 text-[#5E5E5E]'>
                                    To
                                    <input className='py-5 w-1/2  border-[0.2px] rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none border-none'
                                        type="time"
                                        name='endTimeWork'
                                        id='endTimeWork'
                                        placeholder='5 Pm'
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.endTimeWork}
                                    />
                                </div>
                            </div>
                            {formik.touched.startTimeWork && formik.errors.startTimeWork ? <div className='text-red-500 text-[12px]'> {formik.errors.startTimeWork} </div> : null}
                            {formik.touched.endTimeWork && formik.errors.endTimeWork ? <div className='text-red-500 text-[12px]'> {formik.errors.endTimeWork} </div> : null}

                        </div>

                        <div className="relative  text-left w-full md:w-1/3 mt-[30px]">
                            <button
                                onClick={toggleDropdown}
                                type="button"
                                className="w-full px-4 className='capitalize' bg-[#F2F2F2] py-5  text-[#5E5E5E] rounded-md text-sm text-left border border-gray-300"
                            >
                                choose your work days
                            </button>

                            {isOpen && (
                                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200">
                                    <ul className="py-2 max-h-60 overflow-y-auto">
                                        {weekDays.map((day) => (
                                            <li key={day} className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    id={day}
                                                    checked={selectedDays.includes(day)}
                                                    onChange={() => toggleDay(day)}
                                                    className="custom-checkbox"
                                                />
                                                <label htmlFor={day} className="text-gray-600 text-sm">{day}</label>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="px-4 py-2 border-t border-gray-200 text-right">
                                        <button
                                            className="text-orange-500 text-sm font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            )}
                            {formik.touched.daysWork && formik.errors.daysWork ? <div className='text-red-500 text-[12px]'> {formik.errors.daysWork} </div> : null}

                        </div>

                        <div className='flex gap-2.5 flex-col w-full md:w-1/3'>
                            <label className='capitalize' htmlFor="price"> price </label>

                            <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                type="text"
                                name='price'
                                id='price'
                                placeholder='Enter your check fee'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            />
                            {formik.touched.price && formik.errors.price ? <div className='text-red-500 text-[12px]'> {formik.errors.price} </div> : null}

                        </div>

                    </div>


                </div>

                <div className='bg-white px-8 py-7 flex  justify-between ' >

                    <div>
                        {errorMsg && <div className='text-red-500 text-[14px] md:text-xl lg:text-2xl'> {errorMsg} </div>}
                    </div>

                    <div className='flex gap-4'>
                        <button type='button' onClick={() => dispatch(togleCard())} className=' px-[30px] py-3 rounded-lg cursor-pointer text-primary border border-primary bg-transparent capitalize'> cancel</button>
                        <button type='submit' className=' px-[30px] py-3 rounded-lg cursor-pointer text-white bg-primary capitalize'> confirm</button>
                    </div>

                </div>

            </form>


        </div>




    )
}

export default BecomeDoctor