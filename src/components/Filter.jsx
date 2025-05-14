import React from 'react'
import { Link } from "react-router-dom";
import FilterLocation from '../lib/FilterLocation';
import { CaretLeft, Faders } from "phosphor-react";



const Filter = ({ activeFilter, setActiveFilter, filters, setFilters }) => {



    const [mobFilter, setMobFilter] = React.useState(false);


    return (

        <div className="flex justify-between items-center  pt-12">

            <div className='flex gap-4 flex-col'>

                <ul className="gap-3  hidden md:flex">
                    <li
                        className={`rounded-[22px] px-4 py-3 cursor-pointer ${activeFilter === 'price' ? 'bg-primary text-white' : 'bg-[#D38139] text-white'}`}
                        onClick={() => setActiveFilter('price')}
                    >
                        Price
                    </li>
                    <li
                        className={`rounded-[22px] px-4 py-3 cursor-pointer ${activeFilter === 'location' ? 'bg-primary text-white' : 'bg-[#D38139] text-white'}`}
                        onClick={() => setActiveFilter('location')}
                    >
                        Location
                    </li>
                    <li
                        className={`rounded-[22px] px-4 py-3 cursor-pointer ${activeFilter === 'postedAt' ? 'bg-primary text-white' : 'bg-[#D38139] text-white'}`}
                        onClick={() => setActiveFilter('postedAt')}
                    >
                        Posted at
                    </li>
                    <li
                        className="bg-[#FBF0E7] rounded-[22px] px-4 py-3 cursor-pointer"
                        onClick={() => {
                            setActiveFilter(null);
                            setFilters({ minPrice: '', maxPrice: '', location: '', postedAt: '' });
                        }}
                    >
                        Clear All
                    </li>
                </ul>


                {/* Mobile View */}
                <div className='md:hidden flex gap-4'>

                    <div onClick={() => setMobFilter(!mobFilter)} className="bg-[#FEA230] cursor-pointer flex gap-3 text-white rounded-lg px-4 py-[18px]">
                        <span className='capitalize '>Filter</span>
                        <Faders size={24} />
                    </div>

                    <div
                        onClick={() => {
                            setActiveFilter(null);
                            setFilters({ minPrice: '', maxPrice: '', location: '', postedAt: '' });
                        }}
                        className="bg-[#FBF0E7] cursor-pointer flex gap-3 text-black rounded-lg px-4 py-[18px]">
                        <span className='capitalize '>clear all</span>

                    </div>

                </div>


                {
                    mobFilter && (

                        <div className='bg-white absolute py-14 px-5  top-0 left-0 w-full h-full z-50 flex flex-col '>

                            <div className='text-xl flex items-center gap-1 cursor-pointer' onClick={() => setMobFilter(false)}>
                                <CaretLeft size={20} />
                                <span className='capitalize'>Filters</span>
                            </div>

                            <div className='mt-11'>

                                <div>
                                    <p className='capitalize mb-3'>Price</p>

                                    <div className="flex flex-col  gap-4">
                                        <input
                                            type="number"
                                            placeholder="Min price"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                            className="border p-2 rounded-md w-full md:w-[140px]"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max price"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                            className="border p-2 rounded-md w-full md:w-[140px]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <p className='capitalize mb-3 mt-5'>Location</p>

                                    <FilterLocation
                                        onCountryChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
                                        onCityChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
                                    />
                                </div>

                                <div>
                                    <p className='capitalize mb-3 mt-5'>Posted at</p>

                                    <input
                                        type="date"
                                        value={filters.postedAt}
                                        onChange={(e) => setFilters({ ...filters, postedAt: e.target.value })}
                                        className="border p-2 rounded-md w-full md:w-[300px]"
                                    />
                                </div>



                                <button
                                    onClick={() => setMobFilter(false)}
                                    className='bg-primary cursor-pointer rounded-[22px] w-full px-4 py-[18px] text-white mt-5'>
                                    Save
                                </button>

                            </div>

                        </div>
                    )

                }

                {activeFilter && (
                    <div className="mt-4">

                        {activeFilter === 'price' && (
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="number"
                                    placeholder="Min price"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                    className="border p-2 rounded-md w-full md:w-[140px]"
                                />
                                <input
                                    type="number"
                                    placeholder="Max price"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                    className="border p-2 rounded-md w-full md:w-[140px]"
                                />
                            </div>
                        )}



                        {activeFilter === 'location' && (

                            <FilterLocation
                                onCountryChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
                                onCityChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
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