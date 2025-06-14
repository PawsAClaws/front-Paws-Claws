import React, { useEffect, useState } from 'react'
import { CaretRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from '../lib/categoryApi';
import Loading from "../components/Loading";



const Categories = () => {



    const [mycategories, setMyCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();





    const handleClick = (itemId) => {
        navigate(`/createPost/${itemId}`);
    };




    useEffect(() => {

        const getData = async () => {

            try {

                const data = await fetchCategories();

                setMyCategories(data);




            } catch (error) {

                console.log(error);


            } finally {
                setLoading(false);
            }



        }

        getData()

    }, []);



    { if (loading) return <Loading />; }

    return (
        <div className='min-h-screen container mx-auto'>

            <h5 className='text-center py-16'> What are you offering? </h5>

            <p className='my-8'> Choose Category </p>

            <div className='grid grid-cols-1 md:grid-cols-2'>


                {mycategories.map((item, index) => {
                    return (
                        <div className='flex  justify-between items-center gap-3' key={index}>

                            <div onClick={() => handleClick(item.id)} className={`flex p-6 hover:bg-[#FBF0E7] items-center cursor-pointer border-b-[0.5px] w-full border-black justify-between ${index % 2 === 0 ? ' md:border-e' : ''} `}>

                                <div className='flex items-center gap-4'>
                                    <div className='bg-primary w-20'>
                                        <img src={item.photo} alt={item.name} />
                                    </div>

                                    <h5>{item.name}</h5>
                                </div>

                                <div>
                                    <CaretRight />
                                </div>


                            </div>


                        </div>
                    )
                })}

            </div>

            <div>


            </div>


        </div>
    )
}

export default Categories