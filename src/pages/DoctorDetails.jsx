import React, { useEffect, useState } from 'react'
import { MapPin, Clock, Star, Money } from 'phosphor-react'
import BASE_URL, { cookies } from '../lib/api'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import docAvatar from '../assets/docAvatar.png'
import bgDoc from '../assets/bgDoc.png'



const DoctorDetails = () => {

    const [doctorDetails, setDoctorDetails] = useState({})


    const { id } = useParams();


    const getDoctorDetails = async () => {

        const token = cookies.get("token");

        try {

            const response = await axios.get(`${BASE_URL}/doctor/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            setDoctorDetails(response?.data?.data);



        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getDoctorDetails();
    }, [])


    console.log(doctorDetails?.daysWork);


    return (

        <div className='bg-[#F9FAFB] pb-[10%]'>

            <div className='relative w-full h-[300px] md:h-[500px] lg:h-[750px]'>
                <img className='w-full h-full object-cover  ' src={bgDoc} />

                <div className='text-white absolute top-[40%] left-[10%]'>

                    <div className='flex gap-3 items-center '>
                        <div className='w-[120px] h-[120px] md:w-[230px] md:h-[230px] rounded-full overflow-hidden border border-primary'>
                            <img src={doctorDetails?.card ? doctorDetails.card : docAvatar} alt="" />
                        </div>
                        <div>
                            <h4 className='text-3xl md:text-5xl lg:text-6xl'> Dr. {doctorDetails.realName}</h4>
                            <p className='text-lg md:text-xl lg:text-2xl mt-4'> speciality {doctorDetails.speciality} </p>
                        </div>
                    </div>

                </div>
            </div>


            <div className='container mx-auto'>

                <div className='bg-white w-full p-11 relative top-[-30px] rounded-[18px] shadow-md'>

                    <div className='flex justify-between items-center flex-wrap md:flex-nowrap'>

                        <div className='flex mt-7 items-center gap-2 flex-wrap sm:flex-nowrap'>
                            <Clock className='text-xl' />
                            <div className='break-words max-w-[300px] sm:max-w-none'>
                                {doctorDetails?.daysWork}
                            </div>
                        </div>



                        <div className='mt-5 flex gap-2 items-center'>
                            <div className='flex text-amber-300'>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                            <div> 5.0 (100 reviews) </div>
                        </div>

                    </div>

                    <div className='flex gap-2 items-center my-[40px]'>
                        <MapPin className=' text-primary text-xl' />
                        <div> {doctorDetails?.address}  </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <Money className='text-green-500 text-xl' />
                            <div> {doctorDetails?.price} pound for appointment </div>
                        </div>

                        <div>
                            <span className='text-[#A6A6A6] text-sm'> {doctorDetails?.experience} years of experience </span>
                        </div>

                    </div>

                </div>

                <div className='mt-8 text-[18px] md:text-2xl lg:text-3xl text-[#191919] leading-[160%]'>
                    <p> {doctorDetails?.bio} </p>
                </div>

                <div className='w-full flex justify-center mt-16'>
                    <Link
                        to="/booking"
                        state={{ doctorId: doctorDetails.id }}
                        className='bg-primary rounded-[8px] text-center w-[60%] text-white py-2.5 mt-5 cursor-pointer'> Book Appointment </Link>
                </div>

            </div>


        </div>
    )

}

export default DoctorDetails