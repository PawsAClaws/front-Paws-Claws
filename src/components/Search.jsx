import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, setSearchResults, clearSearch } from '../store/searchSlice.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Search = () => {



    const dispatch = useDispatch()
    const navigate = useNavigate()


    const searchTerm = useSelector((state) => state.search.term)



    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
    }

    const handleSearch = async () => {

        if (searchTerm.trim() === "") return

        try {
            const response = await axios.get(`https://backend-online-courses.onrender.com/api/v1/post`, {
                params: {
                    type: 'sale',
                    page: 1,
                    limit: 100,
                    sortBy: 'DESC',
                    q: searchTerm,
                }
            })

            dispatch(setSearchResults(response.data.data))
            navigate('/search')
        } catch (error) {
            console.error("Error fetching data", error)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            dispatch(clearSearch())
            navigate("/home")
        }
    }, [searchTerm, dispatch, navigate])


    return (

        <div>
            <div className="relative border border-[#FBF0E7] rounded-lg w-[150px] md:w-[288px]">
                <button
                    onClick={handleSearch}
                    className="absolute cursor-pointer inset-y-0.5 end-0 rounded-lg text-white w-8 h-8 bg-primary flex items-center justify-center"
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
                <input
                    type="search"
                    className="block w-full p-2 ps-4 text-sm"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    )
}

export default Search