import React, { useEffect, useState } from "react";
import History from "../components/History";
import ReactPaginate from "react-paginate";
import { CaretRight, CaretLeft } from "phosphor-react";
import { fetchPages } from "../lib/PagesApi";
import Card from "../components/Card";
import { all } from "axios";

const itemsPerPage = 24;


export default function Shop() {

    const [currentPage, setCurrentPage] = useState(0);

    const [allShop, setAllShop] = useState([]);

    const shop = "shop";

    const offset = currentPage * itemsPerPage;
    const currentItems = allShop.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allShop.length / itemsPerPage);




    useEffect(() => {

        const getShopData = async () => {

            try {
                const data = await fetchPages(shop);

                setAllShop(data.posts);

            } catch (error) {
                console.log(error);
            }
        }

        getShopData();
    }, [])





    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };




    return (

        <div className="bg-[#F9FAFB] pb-16">


            <div className="container mx-auto ">
                {/* History Component */}
                <div className="pt-[34px]">
                    <History />
                </div>

                {/* Filters and Post Ad */}
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

                {/* Sort Section */}
                <div className="flex justify-between items-center my-8">
                    <div>Recent Added</div>
                    <div>
                        Sort by: <span className="text-primary">Recent Added</span>
                    </div>
                </div>

                {/* Image Grid */}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

                    {allShop.map((item, index) => (

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
