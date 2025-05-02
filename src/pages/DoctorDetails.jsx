import React from 'react'
import bgDoc from '../assets/bgDoc.png'
import { MapPin, Clock, Star, Money } from 'phosphor-react'


const DoctorDetails = () => {



    return (

        <div className='bg-[#F9FAFB] pb-[10%]'>

            <div className='relative w-full h-[300px] md:h-[500px] lg:h-[750px]'>
                <img className='w-full h-full object-cover' src={bgDoc} alt="" />
                <div className='text-white absolute top-[40%] left-[10%]'>
                    <h4 className='text-3xl md:text-5xl lg:text-6xl'>Dr. Johnson</h4>
                    <p className='text-lg md:text-xl lg:text-2xl mt-4'>Pet Surgery Specialist</p>
                </div>
            </div>


            <div className='container mx-auto'>

                <div className='bg-white w-full p-11 relative top-[-30px] rounded-[18px] shadow-md'>

                    <div className='flex justify-between items-center'>

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

                    </div>

                    <div className='flex gap-2 items-center my-[60px]'>
                        <MapPin className=' text-primary text-xl' />
                        <div> 2972 Westheimer Rd. Santa Ana, Illinois 85486  </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <Money className='text-green-500 text-xl' />
                            <div> 120 pound for appointment </div>
                        </div>

                        <div>
                            <span className='text-[#A6A6A6] text-sm'> 10 years of experience </span>
                        </div>

                    </div>

                </div>

                <div className='mt-8 text-[18px] md:text-2xl lg:text-3xl text-[#191919] leading-[160%]'>
                    <p>Dr. Johnson, one of the most skilled and experienced veterinarians and the owner of the most convenient
                        animal clinic “Petz & Vetz” Our paradise is situated in the heart of
                        the town with a pleasant environment. We are ready to treat your beloved doggos &
                        puppers with love and involvement.
                        Book the appointment now !</p>
                </div>

                <div className='w-full flex justify-center mt-16'>
                    <button className='bg-primary rounded-[8px] w-[60%] text-white py-2.5 mt-5 cursor-pointer'> Book Appointment </button>
                </div> <button>  </button>

            </div>


        </div>
    )

}

export default DoctorDetails