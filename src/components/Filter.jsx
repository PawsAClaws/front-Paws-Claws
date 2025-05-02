import React from 'react'
import { Link } from "react-router-dom";
import CountryOnly from '../lib/CountryOnly';



const Filter = ({ activeFilter, setActiveFilter, filters, setFilters }) => {
    return (

        <div className="flex justify-between items-center  pt-12">

            <div className='flex gap-4 flex-col'>

                <ul className="gap-3 hidden md:flex">
                    <li
                        className={`rounded-[22px] px-4 py-3 cursor-pointer ${activeFilter === 'price' ? 'bg-[#D38139] text-white' : 'bg-[#FBF0E7]'}`}
                        onClick={() => setActiveFilter('price')}
                    >
                        Price
                    </li>
                    <li
                        className={`rounded-[22px] px-4 py-3 cursor-pointer ${activeFilter === 'location' ? 'bg-[#D38139] text-white' : 'bg-[#FBF0E7]'}`}
                        onClick={() => setActiveFilter('location')}
                    >
                        Location
                    </li>
                    <li
                        className={`rounded-[22px] px-4 py-3 cursor-pointer ${activeFilter === 'postedAt' ? 'bg-[#D38139] text-white' : 'bg-[#FBF0E7]'}`}
                        onClick={() => setActiveFilter('postedAt')}
                    >
                        Posted at
                    </li>
                    <li
                        className="bg-[#FBF0E7] rounded-[22px] px-4 py-3 cursor-pointer"
                        onClick={() => {
                            setActiveFilter(null);
                            setFilters({ price: '', location: '', postedAt: '' });
                        }}
                    >
                        Clear All
                    </li>
                </ul>

                {activeFilter && (
                    <div className="mt-4">
                        {activeFilter === 'price' && (

                            <input
                                type="number"
                                placeholder="Enter max price"
                                value={filters.price}
                                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                                className="border p-2 rounded-md w-full md:w-[300px]"
                            />


                        )}
                        {activeFilter === 'location' && (

                            <CountryOnly
                                onCountryChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
                            />



                        )}

                        {activeFilter === 'postedAt' && (
                            <input
                                type="date"
                                value={filters.postedAt}
                                onChange={(e) => setFilters({ ...filters, postedAt: e.target.value })}
                                className="border p-2 rounded-md w-full md:w-[300px]"
                            />
                        )}

                    </div>
                )}


            </div>





            <Link to="/categories" className="bg-[#FEA230] cursor-pointer text-white rounded-lg px-4 py-[18px]">
                Post your ad
            </Link>
        </div>
    )
}

export default Filter