import React from 'react'
import { MapPin, Clock, Star, Money } from 'phosphor-react'
import docimg from '../assets/doc.png'
import docAvatar from '../assets/docAvatar.png'
import { Link } from 'react-router-dom'



const DoctorsCard = ({ data }) => {


    console.log(data);




    return (

        <div className='bg-white p-5'>


            <Link to={`/doctorDetail/${data.id}`} >

                <div className='flex gap-5'>

                    <div className='w-[170px] h-[110px]'> <img className='w-full h-full' src={data.card ? data.card : docAvatar} alt={data.realName} /> </div>

                    <div className='flex flex-col gap-2.5'>
                        <h4 className=' text-xl '> Dr. {data.realName} </h4>
                        <p className='text-[#4B5563]'>   {data.bio && data.bio.split(' ').length > 6
                            ? data.bio.split(' ').slice(0, 6).join(' ') + '...'
                            : data.bio} </p>
                    </div>

                </div  >

                <div className='flex justify-between px-2 mt-5'>

                    <div className='flex gap-2 items-center'>
                        <MapPin className=' text-primary text-xl' />
                        <div> {data.address} </div>
                    </div>



                    <div className='flex gap-2 items-center'>
                        <Money className='text-green-500 text-xl' />
                        <div> {data.price} L.E </div>
                    </div>


                </div>

                <div className='flex mt-7 items-center gap-2'>
                    <Clock className='text-xl' />

                    {data.daysWork.length > 2
                        ? data.daysWork.slice(0, 2).join(' - ') + ' ...'
                        : data.daysWork.join(' - ')}{' '}
                    at {data.startTimeWork} - {data.endTimeWork}

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

            </Link>


            <div className='w-full flex justify-center'>
                <Link to="/booking"
                    state={{ doctorId: data.id }}
                    className='bg-primary text-center rounded-[8px] w-[90%] text-white py-2.5 mt-5 cursor-pointer'> Book Appointment </Link>
            </div>

        </div>
    )
}

export default DoctorsCard