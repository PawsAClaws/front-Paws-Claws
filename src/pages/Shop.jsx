import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import History from "../components/History";
import ReactPaginate from "react-paginate";
import { CaretRight, CaretLeft } from "phosphor-react";
import { fetchPages } from "../lib/PagesApi";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Filter from "../components/Filter";

const itemsPerPage = 24;

export default function Shop() {
    const [currentPage, setCurrentPage] = useState(0);
    const [activeFilter, setActiveFilter] = useState(null);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        country: '',
        city: '',
        postedAt: ''
    });

    const shop = "shop";

    // React Query hook للداتا
    const {
        data: shopData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['shop', shop],
        queryFn: () => fetchPages(shop),
        select: (data) => data?.posts || [],
        staleTime: Infinity, // الداتا مش هتبقى stale أبداً
        cacheTime: 30 * 60 * 1000, // 30 minutes cache
        refetchOnMount: false, // مش هيعمل refetch لما الكومبوننت يتعمل mount
        refetchOnWindowFocus: false, // مش هيعمل refetch لما نرجع للتاب
        refetchOnReconnect: false, // مش هيعمل refetch لما الإنترنت يرجع
        refetchInterval: false, // مش هيعمل refetch تلقائي
    });

    const allShop = shopData || [];

    const filteredItems = allShop.filter(item => {
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
        console.error('Error fetching shop data:', error);
        return <div>Error loading shop data</div>;
    }

    return (
        <div className="bg-[#F9FAFB] pb-16">
            <div className="container mx-auto ">
                {/* Filters and Post Ad */}
                <Filter
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Sort Section */}
                <div className="flex justify-between items-center my-8">
                    <div>Recent Added</div>
                    <div>
                        Sort by: <span className="text-primary">Recent Added</span>
                    </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {currentItems.map((item, index) => (
                        <Card key={index} data={item} />
                    ))}
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
        </div>
    );
}