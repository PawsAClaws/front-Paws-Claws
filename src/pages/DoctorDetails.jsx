import React, { useEffect, useState } from 'react'
import { MapPin, Clock, Star, Money, ThumbsUp, ThumbsDown, PaperPlaneRight } from 'phosphor-react'
import BASE_URL, { cookies } from '../lib/api'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import docAvatar from '../assets/docAvatar.png'
import bgDoc from '../assets/bgDoc.png'
import avatar from '../assets/avatar.png'
import { fetchAddReview, fetchgetreview } from '../lib/reviewApi'


const ratings = [
    { stars: 5, percentage: 90 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
];


const DoctorDetails = () => {

    const [doctorDetails, setDoctorDetails] = useState({})
    const [reviewsData, setReviewsData] = useState([])

    const [myComment, setMyComment] = useState("");
    const [myRating, setMyRating] = useState(0);


    const { id } = useParams()




    const getDoctorDetails = async () => {

        const token = cookies.get("token");

        try {

            const response = await axios.get(`${BASE_URL}/doctor/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            setDoctorDetails(response?.data?.data);



        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getDoctorDetails();
    }, [])

    useEffect(() => {


        const getReviewsData = async () => {

            try {

                const res = await fetchgetreview(id);
                console.log(res);
                setReviewsData(res);

            } catch (error) {
                console.log(error);
            }
        }

        getReviewsData();

    }, [])



    const averageRating = reviewsData.length > 0
        ? (
            reviewsData.reduce((sum, item) => sum + (item.rating || 0), 0) / reviewsData.length
        ).toFixed(1)
        : 0;

    const handleMyRate = async () => {

        try {
            await fetchAddReview(id, myComment, myRating);
            console.log("Review submitted successfully");

            setMyComment("");
            setMyRating(0);

            const updatedReviews = await fetchgetreview(id);
            setReviewsData(updatedReviews);

        } catch (error) {
            console.error(error);
        }


    }





    return (

        <div className='bg-[#F9FAFB] pb-[10%]'>

            <div className='relative w-full h-[300px] md:h-[500px] lg:h-[750px]'>
                <img className='w-full h-full object-cover  ' src={bgDoc} />

                <div className='text-white absolute top-[40%] left-[10%]'>

                    <div className='flex gap-3 items-center '>
                        <div className='w-[120px] h-[120px] md:w-[230px] md:h-[230px] rounded-full overflow-hidden border border-primary'>
                            <img src={doctorDetails?.card ? doctorDetails.card : docAvatar} alt="" />
                        </div>
                        <div>
                            <h4 className='text-3xl md:text-5xl lg:text-6xl'> Dr. {doctorDetails.realName}</h4>
                            <p className='text-lg md:text-xl lg:text-2xl mt-4'> speciality {doctorDetails.speciality} </p>
                        </div>
                    </div>

                </div>
            </div>


            <div className='container mx-auto'>

                <div className='bg-white w-full p-11 relative top-[-30px] rounded-[18px] shadow-md'>

                    <div className='flex justify-between items-center flex-wrap md:flex-nowrap'>

                        <div className='flex mt-7 items-center gap-2 flex-wrap sm:flex-nowrap'>
                            <Clock className='text-xl' />
                            <div className='break-words max-w-[300px] sm:max-w-none'>
                                {doctorDetails?.daysWork ? doctorDetails?.daysWork.join(" - ") : ""} <br />
                            </div>
                        </div>



                        <div className='mt-5 flex gap-2 items-center'>
                            <div className='flex'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        weight="fill"
                                        size={20}
                                        className={star <= averageRating ? 'text-amber-400' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                            <div> {averageRating} ({reviewsData.length} reviews) </div>
                        </div>

                    </div>

                    <div className='flex gap-2 items-center my-[40px]'>
                        <MapPin className=' text-primary text-xl' />
                        <div> {doctorDetails?.address}  </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <Money className='text-green-500 text-xl' />
                            <div> {doctorDetails?.price} pound for appointment </div>
                        </div>

                        <div>
                            <span className='text-[#A6A6A6] text-sm'> {doctorDetails?.experience} years of experience </span>
                        </div>

                    </div>

                </div>

                <div className='mt-8 text-[18px] md:text-2xl lg:text-3xl text-[#191919] leading-[160%]'>
                    <p> {doctorDetails?.bio} </p>
                </div>

                <div className='w-full flex justify-center mt-16'>
                    <Link
                        to="/booking"
                        state={{ doctorId: doctorDetails.id }}
                        className='bg-primary rounded-[8px] text-center w-[60%] text-white py-2.5 mt-5 cursor-pointer'> Book Appointment </Link>
                </div>

            </div>

            <div className='w-full h-[1px] bg-[#A6A6A6] mt-16'></div>

            <div className='container mx-auto mt-16'>


                <div className='flex gap-[20%] items-center'>
                    <div className='flex items-center gap-2 md:text-4xl'>
                        <div> {averageRating} </div>
                        <Star

                            weight="fill"
                            size={36}
                            className={'text-amber-400 '}
                        />

                    </div>

                    <div className="space-y-2 w-full md:w-[50%]">
                        {ratings.map((item) => (
                            <div key={item.stars} className="flex items-center gap-2">
                                <span className="w-4 text-sm">{item.stars}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                    <div
                                        className="h-2 rounded-full absolute top-0 left-0 bg-yellow-400 transition-all duration-500"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="w-10 text-sm text-right">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>



            </div>

            <div className='w-full h-[1px] bg-[#A6A6A6] mt-16'></div>

            <div className='container mx-auto mt-16'>

                <div>

                    <div className='flex justify-between items-center '>
                        <div> all reviews ({reviewsData?.length}) </div>
                        <div className=''> view more </div>
                    </div>

                    <div>
                        {reviewsData.map((item, index) => (
                            <div key={index} className='flex gap-4 items-center mt-8'>
                                <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                                    <img className='w-full h-full' src={item.user.photo ? item.user.photo : avatar} alt="" />
                                </div>

                                <div className='flex flex-col gap-1 w-full'>
                                    <div className='capitalize'> {item?.user?.firstName} {item?.user?.lastName} </div>

                                    <div className='flex'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                weight="fill"
                                                size={20}
                                                className={star <= item.rating ? 'text-amber-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>

                                    <div className='text-[#7B7B7B]'> {item.comment} </div>

                                    <div className='flex gap-2 items-center text-primary text-xl cursor-pointer'>
                                        <ThumbsUp />
                                        <ThumbsDown />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


                <div className='flex gap-4 items-center mt-8'>

                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden'><img className='w-full h-full' src={avatar} alt="" /></div>

                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="w-[50%] border-none p-1.5 border-b border-solid border-[#A6A6A6] outline-none"
                        value={myComment}
                        onChange={(e) => setMyComment(e.target.value)}
                    />

                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-[#9E9E9E] '> Rate</p>

                        <div className="flex myRate">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    weight="fill"
                                    size={20}
                                    className={`${star <= myRating ? 'text-amber-400' : 'text-gray-300'} cursor-pointer`}
                                    onClick={() => setMyRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <button onClick={handleMyRate} className=' w-[40px] h-[40px] bg-[#ACACAC] hover:bg-primary cursor-pointer flex justify-center items-center text-2xl text-white'> <PaperPlaneRight /> </button>

                </div>



            </div>

            <div className='w-full h-[1px] bg-[#A6A6A6] mt-16'></div>

        </div>
    )

}

export default DoctorDetails