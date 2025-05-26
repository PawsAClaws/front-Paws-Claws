import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import ReactPaginate from "react-paginate";
import DoctorsCard from '../components/DoctorsCard'
import { CaretRight, CaretLeft } from "phosphor-react";
import BASE_URL, { cookies } from '../lib/api';
import axios from 'axios';
import Loading from "../components/Loading";




const itemsPerPage = 24;

const Doctors = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [allDoctors, setAllDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState(null);



    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        country: '',
        city: '',
        postedAt: ''
    });


    const filteredItems = allDoctors.filter(item => {
        let isValid = true;

        const itemCountry = item.country?.toLowerCase() || '';
        const itemCity = item.city?.toLowerCase() || '';

        if (filters.country) {
            isValid = isValid && itemCountry === filters.country.toLowerCase();
        }

        if (filters.city) {
            isValid = isValid && itemCity === filters.city.toLowerCase();
        }

        if (filters.minPrice) {
            isValid = isValid && item.price >= Number(filters.minPrice);
        }

        if (filters.maxPrice) {
            isValid = isValid && item.price <= Number(filters.maxPrice);
        }

        if (filters.postedAt) {
            const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
            isValid = isValid && itemDate === filters.postedAt;
        }

        return isValid;
    });


    const offset = currentPage * itemsPerPage;
    const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

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
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        getDoctorsData();

    }, [])



    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    { if (isLoading) return <Loading />; }

    return (

        <div className='bg-bg-app pb-16'>
            <div className='container mx-auto'>

                <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} filters={filters} setFilters={setFilters} />


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