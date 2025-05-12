import { desc, img } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { date } from 'yup'
import avatar from '../assets/avatar.png'
import { X, HourglassMedium, Check, Trash } from 'phosphor-react'
import BASE_URL from '../lib/api'
import axios from 'axios'




const DoctorPage = () => {


    const [tableData, setTableData] = useState([]);

    const [statusCounts, setStatusCounts] = useState({
        pending: 0,
        accepted: 0,
        cancelled: 0
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };



    const managingDoctorRequst = async () => {

        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`${BASE_URL}/appointment/doctor/3`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(res.data.data.appointments);
            setTableData(res?.data?.data?.appointments);
        } catch (error) {
            console.log(error);
        }
    }

    const managingAction = async (id, status) => {
        console.log(id, status);


        try {

            const token = localStorage.getItem("token");

            const res = await axios.put(`${BASE_URL}/appointment/${id}`,
                { status },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
            console.log(res.data);

            managingDoctorRequst();


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        managingDoctorRequst();
    }, [])

    useEffect(() => {
        const counts = tableData.reduce(
            (acc, curr) => {
                const status = curr.status.toLowerCase();
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            },
            { pending: 0, accepted: 0, cancelled: 0 }
        );
        setStatusCounts(counts);
    }, [tableData]);





    return (


        <div className='bg-[#F9FAFB] pb-16'>


            <div className='container mx-auto'>

                <div className=" pt-16 ">

                    <div className="overflow-hidden rounded-[12px] border border-gray-300 w-fit">

                        <table className="min-w-[500px] text-sm text-center  bg-white ">
                            <thead>
                                <tr>
                                    <th className=" px-3 py-2">
                                        <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#D98634] mr-2"></span>
                                        Pending
                                    </th>
                                    <th className="border-s border-gray-300 px-3 py-2">
                                        <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#409261] mr-2"></span>
                                        Accepted
                                    </th>
                                    <th className="border-s border-gray-300 px-3 py-2">
                                        <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#FF4646] mr-2"></span>
                                        Canceled
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-e border-t border-gray-300 px-3 py-2">{statusCounts.pending}</td>
                                    <td className="border-t border-gray-300 px-3 py-2">{statusCounts.accepted}</td>
                                    <td className="border-s border-t border-gray-300 px-3 py-2">{statusCounts.cancelled}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>




                <div className="overflow-x-auto rounded-[12px] shadow-md  w-full mt-10">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="bg-white">
                            <tr className="border-b border-[#E1E1E1] text-[#534D59]">
                                <th className="px-3 py-2">Users</th>
                                <th className="px-3 py-2">E-mail</th>
                                <th className="px-3 py-2">Date/Time</th>
                                <th className="px-3 py-2">Type of Animal</th>
                                <th className="px-3 py-2">Description/Attachments</th>
                                <th className="px-3 py-2">Status</th>
                                <th className="px-3 py-2">Action</th>
                                <th className="px-3 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {tableData.map((item, index) => (
                                <tr key={index} className="border-b border-[#E1E1E1] text-xl">
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <img className="w-full h-full object-cover"
                                                    src={item.user.photo ? item.user.photo : avatar}
                                                    alt="userImg" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-semibold">{item.user.firstName} {item.user.lastName}</div>
                                                <div className="text-[#959595]">{'@' + item.user.firstName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">{item.user.email}</td>
                                    <td className="px-3 py-2"> {formatDate(item.time)} </td>
                                    <td className="px-3 py-2">{item.animal}</td>
                                    <td className="px-3 py-2">{item.description}</td>

                                    <td className="px-3 py-2">
                                        <div
                                            className={`rounded-[54px] px-2 py-1 inline-flex items-center justify-center ${item.status === 'pending'
                                                ? 'bg-[#FFF6EA] text-[#D98634]'
                                                : item.status === 'accepted'
                                                    ? 'bg-[#E9FFEF] text-[#409261]'
                                                    : 'bg-[#FFEAEA] text-[#FF4646]'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block w-[7px] h-[7px] rounded-full mr-2 ${item.status === 'pending'
                                                    ? 'bg-[#D98634]'
                                                    : item.status === 'accepted'
                                                        ? 'bg-[#409261]'
                                                        : 'bg-[#FF4646]'
                                                    }`}
                                            ></span>
                                            {item.status}
                                        </div>
                                    </td>


                                    {/* <td className="px-3 py-2">
                                        <div className='flex gap-2.5 justify-center flex-wrap'>
                                            {item.status === 'pending' && (
                                                <>
                                                    <div className='flex items-center gap-1 bg-[#FFA5A5] rounded-[54px] px-2 py-1 text-[#FF4646]'>
                                                        <button className='cursor-pointer'>Cancel</button>
                                                        <X />
                                                    </div>
                                                    <div className='flex items-center gap-1 bg-[#E9FFEF] rounded-[54px] px-2 py-1 text-[#409261]'>
                                                        <button className='cursor-pointer'>Accept</button>
                                                        <Check />
                                                    </div>
                                                </>
                                            )}
                                            {item.status === 'accepted' && (
                                                <>

                                                    <div className='flex items-center gap-1 bg-[#FFA5A5] rounded-[54px] px-2 py-1 text-[#FF4646]'>
                                                        <button className='cursor-pointer'>Cancel</button>
                                                        <X />
                                                    </div>

                                                    <div className='flex items-center gap-1 bg-[#FFF2DD] rounded-[54px] px-2 py-1 text-[#D98634]'>
                                                        <button className='cursor-pointer'>pend </button>
                                                        <HourglassMedium />
                                                    </div>
                                                </>
                                            )}
                                            {item.status === 'cancelled' && (
                                                <>

                                                    <div className='flex items-center gap-1 bg-[#FFF2DD] rounded-[54px] px-2 py-1 text-[#D98634]'>
                                                        <button className='cursor-pointer'>pend </button>
                                                        <HourglassMedium />
                                                    </div>

                                                    <div className='flex items-center gap-1 bg-[#E9FFEF] rounded-[54px] px-2 py-1 text-[#409261]'>
                                                        <button className='cursor-pointer'>Accept</button>
                                                        <Check />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td> */}

                                    <td>

                                        <div className='flex gap-2.5 justify-center flex-wrap'>
                                            <div className='flex items-center gap-1 bg-[#FFA5A5] rounded-[54px] px-2 py-1 text-[#FF4646]'>
                                                <button onClick={() => managingAction(item.id, "cancelled")} className='cursor-pointer'>Cancel</button>
                                                <X />
                                            </div>
                                            <div className='flex items-center gap-1 bg-[#E9FFEF] rounded-[54px] px-2 py-1 text-[#409261]'>
                                                <button onClick={() => managingAction(item.id, "accepted")} className='cursor-pointer'>Accept</button>
                                                <Check />
                                            </div>
                                        </div>


                                    </td>

                                    <td className="px-3 py-2">
                                        <button className='text-[#959595] cursor-pointer'><Trash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>




        </div>
    )




}

export default DoctorPage