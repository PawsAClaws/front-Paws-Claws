import React from 'react'
import Filter from '../components/Filter'
import DoctorsCard from '../components/DoctorsCard'
import { div } from 'framer-motion/client'

const Doctors = () => {



    return (

        <div className='bg-[#F9FAFB] pb-16'>
            <div className='container mx-auto'>

                <Filter />

                <h6 className='text-2xl my-10'> Most liked </h6>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

                    <DoctorsCard />
                    <DoctorsCard />
                    <DoctorsCard />
                    <DoctorsCard />

                </div>

            </div>


        </div>



    )
}

export default Doctors