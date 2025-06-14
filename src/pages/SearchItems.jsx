import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Card from "../components/Card";
import ReactPaginate from "react-paginate";
import { CaretRight, CaretLeft } from "phosphor-react";

const itemsPerPage = 24;



const SearchItems = () => {


    const [currentPage, setCurrentPage] = useState(0);

    const [allItems, setAllItems] = useState([]);







    const result = useSelector(state => state.search.results);





    useEffect(() => {
        setAllItems(result.posts);
        setCurrentPage(0);
    }, [result]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };


    const offset = currentPage * itemsPerPage;
    const currentItems = allItems.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allItems.length / itemsPerPage);


    return (
        <div className="bg-[#F9FAFB] pb-16">



            <div className="container mx-auto">

                <div className="flex justify-between items-center mt-12">
                    <ul className="gap-3 hidden md:flex">
                        <li className="bg-[#D38139] text-white rounded-[22px] px-4 py-3">Price</li>
                        <li className="bg-[#D38139] text-white rounded-[22px] px-4 py-3">Location</li>
                        <li className="bg-[#D38139] text-white rounded-[22px] px-4 py-3">Distance</li>
                        <li className="bg-[#D38139] text-white rounded-[22px] px-4 py-3">Posted at</li>
                        <li className="bg-[#FBF0E7] rounded-[22px] px-4 py-3">Clear All</li>
                    </ul>
                    <button className="bg-[#FEA230] text-white rounded-lg px-4 py-[18px]">
                        Post your ad
                    </button>
                </div>

                <div className="flex justify-between items-center my-8">
                    <div className="text-lg md:text-2xl lg:text-3xl"> Search Results: <span className="text-primary"> {currentItems.length} </span> </div>
                    <div className="text-lg md:text-2xl lg:text-3xl">
                        Sort by: <span className="text-primary"> Recent Added </span>
                    </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

                    {currentItems.map((item, index) => (

                        <Card key={index} data={item} />

                    ))}

                </div>




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
    )
}

export default SearchItems