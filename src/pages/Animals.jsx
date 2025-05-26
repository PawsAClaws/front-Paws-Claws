import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CaretRight, CaretLeft } from "phosphor-react";
import { fetchPages } from "../lib/PagesApi";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Loading from "../components/Loading";

const itemsPerPage = 24;

export default function Animals() {

    const [currentPage, setCurrentPage] = useState(0);

    const [allSell, setAllSell] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        country: '',
        city: '',
        postedAt: ''
    });




    const filteredItems = allSell.filter(item => {
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





    const sell = "sale";

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);


    useEffect(() => {

        const getSellData = async () => {

            try {
                const data = await fetchPages(sell);

                setAllSell(data.posts);

            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getSellData();
    }, [])

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };


    { if (isLoading) return <Loading />; }


    return (

        <div className="bg-[#F9FAFB] pb-16">


            <div className="container mx-auto ">


                {/* Filters and Post Ad */}

                <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} filters={filters} setFilters={setFilters} />

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

            </div >

        </div>

    );
}
