import React, { useState } from 'react'



const BecomeDoctor = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState(['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    const toggleDropdown = () => setIsOpen(!isOpen);

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };


    return (

        <div className=' bg-amber-50'>


            <div className='flex justify-center items-center h-full'>

                <div className='w-full md:w-[90%] lg:[80%] px-8'>

                    <div className='bg-white px-8 py-11'>
                        <h5 className='text-md md:text-xl'> became a doctor </h5>
                    </div>

                    <div className='bg-[#F3F4F8] p-8'>

                        <form className='text-sm' >

                            <div className='flex flex-col gap-8'>

                                <div className='flex flex-col md:flex-row gap-4 '>

                                    <div className='flex gap-2.5 flex-col w-full'>

                                        <label htmlFor="name"> Name </label>

                                        <input className='py-5 w-full  border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='name'
                                            placeholder='Enter real your name'
                                        />


                                    </div>

                                    <div className='flex gap-2.5 flex-col w-full'>
                                        <label htmlFor="address w-full"> address </label>

                                        <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='address'
                                            placeholder='Enter your address'
                                        />
                                    </div>


                                </div>

                                <div className='flex flex-col md:flex-row gap-4 '>

                                    <div className='flex gap-2.5 flex-col w-full'>

                                        <label htmlFor="name"> license </label>

                                        <input className='py-5 w-full  border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='license'
                                            placeholder='Enter real your name'
                                        />


                                    </div>

                                    <div className='flex gap-2.5 flex-col w-full'>
                                        <label htmlFor="speciality "> speciality </label>

                                        <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='speciality'
                                            placeholder='Enter your speciality (dogs-cats-birds)'
                                        />
                                    </div>
                                </div>


                                <div className='flex flex-col md:flex-row gap-4 '>

                                    <div className='flex gap-2.5 flex-col w-full'>

                                        <label htmlFor="experience"> experience </label>

                                        <input className='py-5 w-full  border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='experience'
                                            placeholder='Enter real your name'
                                        />
                                    </div>

                                    <div className='flex gap-2.5 flex-col w-full'>
                                        <label htmlFor="price "> price </label>

                                        <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='price'
                                            placeholder='Enter your check fee'
                                        />
                                    </div>

                                    <div className='flex gap-2.5 flex-col w-full'>
                                        <label htmlFor="numOfReservat"> number of reservations  </label>

                                        <input className='py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none'
                                            type="text"
                                            name='numOfReservat'
                                            placeholder='How many reservations you want to take'
                                        />
                                    </div>


                                </div>

                                <div className='flex flex-col md:flex-row gap-4'>

                                    <div className='flex gap-2.5 flex-col w-full md:w-1/2'>

                                        <label htmlFor="name"> Working hours </label>

                                        <div className='flex border-[0.2px] border-gray-300 bg-[#F2F2F2] rounded-[8px] w-full'>

                                            <div className='flex items-center px-2 text-[#5E5E5E]'>
                                                From
                                                <input className='py-5 w-full  border-[0.2px] rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none border-none'
                                                    type="text"
                                                    name='license'
                                                    placeholder='8 Am'
                                                />
                                            </div>

                                            <div className='flex items-center px-2 text-[#5E5E5E]'>
                                                To
                                                <input className='py-5 w-full  border-[0.2px] rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none border-none'
                                                    type="text"
                                                    name='license'
                                                    placeholder='5 Pm'
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="relative  text-left w-1/3 mt-[30px]">
                                        {/* Trigger Button */}
                                        <button
                                            onClick={toggleDropdown}
                                            type="button"
                                            className="w-full px-4 bg-[#F2F2F2] py-5  text-[#5E5E5E] rounded-md text-sm text-left border border-gray-300"
                                        >
                                            choose your work days
                                        </button>
                                        {/* Dropdown Menu */}

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
                                    </div>

                                </div>

                                <div className="flex gap-2.5 flex-col w-full">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Write a short description about you"
                                        className="py-5 w-full border-[0.2px] border-gray-300 rounded-[8px] px-2 bg-[#F2F2F2] focus:outline-none resize-none"
                                        rows={4}
                                    />
                                </div>

                            </div>



                        </form>


                    </div>


                </div>

            </div>


        </div>
    )
}

export default BecomeDoctor