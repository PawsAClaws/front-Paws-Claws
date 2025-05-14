import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import ReactPaginate from "react-paginate";
import DoctorsCard from '../components/DoctorsCard'
import { CaretRight, CaretLeft } from "phosphor-react";
import BASE_URL, { cookies } from '../lib/api';
import axios from 'axios';


const itemsPerPage = 24;

const Doctors = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [allDoctors, setAllDoctors] = useState([]);


    const getDoctorsData = async () => {

        const token = cookies.get("token");

        try {

            const response = await axios.get(`${BASE_URL}/doctor`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data.doctors);

            setAllDoctors(response?.data?.data?.doctors);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getDoctorsData();

    }, [])




    const offset = currentPage * itemsPerPage;
    const currentItems = allDoctors.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allDoctors.length / itemsPerPage);



    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (

        <div className='bg-bg-app pb-16'>
            <div className='container mx-auto'>

                <Filter />

                <h6 className='text-2xl my-10'> Most liked </h6>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

                    {currentItems.map((item, index) => (
                        <DoctorsCard key={index} data={item} />
                    ))}


                </div>

            </div>



            {/* Pagination */}
            <div className="flex justify-center mt-9">
                <ReactPaginate
                    previousLabel={<CaretLeft />}
                    nextLabel={<CaretRight />}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex gap-2"}
                    pageClassName={"px-3 py-2  rounded-md cursor-pointer"}
                    activeClassName={" text-black border border-primary"}
                    previousClassName={"text-primary text-3xl px-3 py-2  rounded-md cursor-pointer"}
                    nextClassName={"text-primary text-3xl px-3 py-2  rounded-md cursor-pointer"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                />
            </div>

        </div>



    )
}

export default Doctors