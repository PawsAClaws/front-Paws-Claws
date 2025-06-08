import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
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
    const [activeFilter, setActiveFilter] = useState(null);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        country: '',
        city: '',
        postedAt: ''
    });

    // دالة لجلب بيانات الأطباء
    const fetchDoctors = async () => {
        const token = cookies.get("token");

        const response = await axios.get(`${BASE_URL}/doctor`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response?.data?.data?.doctors || [];
    };

    // React Query hook للداتا
    const {
        data: allDoctors = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ['doctors'],
        queryFn: fetchDoctors,
        staleTime: Infinity, // الداتا مش هتبقى stale أبداً
        cacheTime: 30 * 60 * 1000, // 30 minutes cache
        refetchOnMount: false, // مش هيعمل refetch لما الكومبوننت يتعمل mount
        refetchOnWindowFocus: false, // مش هيعمل refetch لما نرجع للتاب
        refetchOnReconnect: false, // مش هيعمل refetch لما الإنترنت يرجع
        refetchInterval: false, // مش هيعمل refetch تلقائي
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

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    if (isLoading) return <Loading />;

    if (error) {
        console.error('Error fetching doctors:', error);
        return <div>Error loading doctors data</div>;
    }

    return (
        <div className='bg-bg-app pb-16'>
            <div className='container mx-auto'>
                <Filter
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filters={filters}
                    setFilters={setFilters}
                />

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