import React from 'react'
import doc from '../assets/doc.png'
import { MapPinLine, Money } from "phosphor-react";
import { Link } from 'react-router-dom';
import { fetchReservations } from '../lib/PagesApi';
import Loading from '../components/Loading';




const Reservations = () => {

    const [reservations, setReservations] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };





    React.useEffect(() => {
        const getReservationsData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchReservations()
                setReservations(data?.data?.appointments)

                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
        getReservationsData()

    }, [])

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className=' bg-bg-app py-14'>
            <div className='container mx-auto '>

                {/* card */}
                <div className='grid grid-cols-1 gap-5'>

                    {reservations?.map((item) => (

                        <div className='flex flex-col md:flex-row bg-white rounded-lg p-4  items-center gap-6 h-auto md:h-[350px]'>

                            <div className=' w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] flex-shrink-0'>
                                <img className='w-full h-full object-cover rounded-lg' src={item.doctor?.card ? item.doctor?.card : doc} alt="doctor img" />
                            </div>


                            {/* card info */}
                            <div className='flex-1 flex flex-col justify-between h-full'>
                                <div className='flex justify-between items-start'>
                                    <div className='flex flex-col'>
                                        <h3 className='md:text-2xl capitalize '> Dr.{item?.doctor?.realName} </h3>
                                        <p> <span className='capitalize font-bold'>speciality :</span> {item?.doctor?.speciality} </p>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <MapPinLine className='text-primary' size={24} />
                                        <span className='text-sm'> {item?.doctor?.address} </span>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <Money size={24} />
                                        <span className='text-[#249102] text-sm'> {item?.doctor?.price} pound </span>
                                    </div>
                                </div>

                                <div className='text-center capitalize text-2xl my-4'>
                                    your details
                                </div>

                                <div className='space-y-3 flex-1'>
                                    <div className='capitalize font-bold'>
                                        animals: <span className='font-light text-[#767676]'>{item?.animal}</span>
                                    </div>

                                    <div className='capitalize font-bold'>
                                        description: <span className='font-light text-[#767676]'>{item?.description}</span>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row gap-3 mt-3 md:mt-0  justify-between items-start md:items-center '>

                                    <div className='capitalize font-bold '>
                                        status: <span className={`font-light capitalize rounded-[54px] ${item?.status === "accepted" ? "text-[#409261] bg-[#E9FFEF]" : item?.status === "cancelled" ? "text-[#FF4646] bg-[#FFA5A5]" : "text-[#D98634] bg-[#FFF2DD]"}  py-1 px-2.5 `}> {item?.status} </span>
                                    </div>

                                    <div className='flex items-center gap-3 text-[12px] md:text-[16px] md:flex-col lg:flex-row'>
                                        <Link to={`/chatRoom/${item?.doctorId}`} className='bg-[#FF9131] capitalize text-white py-3.5 px-[18px] rounded-lg hover:bg-[#e8821c] transition-colors'>
                                            Chat with the doctor
                                        </Link>

                                        <button className='bg-[#E6492D] capitalize text-white py-3.5 px-[18px] rounded-lg hover:bg-[#d63c21] transition-colors'>
                                            Cancel the appointment
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))}

                </div>


            </div>
        </div>
    )
}

export default Reservations