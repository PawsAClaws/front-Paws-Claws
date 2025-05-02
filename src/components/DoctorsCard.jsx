import React from 'react'
import { MapPin, Clock, Star, Money } from 'phosphor-react'
import docimg from '../assets/doc.png'



const DoctorsCard = () => {





    return (

        <div className='bg-white p-5'>

            <div className='flex gap-5'>

                <div> <img src={docimg} alt="" /> </div>

                <div className='flex flex-col gap-2.5'>
                    <h4 className=' text-xl md:text-2xl'> Dr. Johnson </h4>
                    <p className='text-[#4B5563]'> Pet Surgery Specialist </p>
                </div>

            </div  >

            <div className='flex justify-between px-8 mt-5'>

                <div className='flex gap-2 items-center'>
                    <MapPin className=' text-primary text-xl' />
                    <div> 2 km </div>
                </div>



                <div className='flex gap-2 items-center'>
                    <Money className='text-green-500 text-xl' />
                    <div> 120 L.E </div>
                </div>


            </div>

            <div className='flex mt-7 items-center gap-2'>
                <Clock className='text-xl' />
                <div> Monday - Friday at 8.00 am - 5.00pm </div>
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

            <div className='w-full flex justify-center'>
                <button className='bg-primary rounded-[8px] w-[90%] text-white py-2.5 mt-5 cursor-pointer'> Book Appointment </button>
            </div>

        </div>
    )
}

export default DoctorsCard