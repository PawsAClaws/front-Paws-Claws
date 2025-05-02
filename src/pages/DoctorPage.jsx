import { desc, img } from 'framer-motion/client'
import React from 'react'
import { date } from 'yup'
import avatar from '../assets/avatar.png'
import { X, HourglassMedium, Check, Trash } from 'phosphor-react'




const DoctorPage = () => {

    const tableData = [
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com",
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "accepted", action: "Accept", img: avatar
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "accepted", action: "Accept"
        },

        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "accepted", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },
        {
            firstName: "John", lastName: "Doe", email: "jessica.hanson@example.com", img: avatar,
            userId: "@jane", date: "Apr/18", time: "10Am", typeAni:
                "Dog", desc: "vaccine and check up", status: "pending ", action: "Accept"
        },


    ]



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
                                    <td className="border-e border-t border-gray-300 px-3 py-2">13</td>
                                    <td className="border-t border-gray-300 px-3 py-2">2</td>
                                    <td className="border-s border-t border-gray-300 px-3 py-2">5</td>
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
                                                <img className="w-full h-full object-cover" src={item.img} alt="" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-semibold">{item.firstName} {item.lastName}</div>
                                                <div className="text-[#959595]">{item.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">{item.email}</td>
                                    <td className="px-3 py-2">{item.date} {item.time}</td>
                                    <td className="px-3 py-2">{item.typeAni}</td>
                                    <td className="px-3 py-2">{item.desc}</td>
                                    <td className="px-3 py-2">
                                        <div className='bg-[#E9FFEF] rounded-[54px] px-2 py-1 text-[#409261] inline-flex items-center justify-center'>
                                            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#409261] mr-2"></span> {item.status}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className='flex gap-2.5 justify-center flex-wrap'>
                                            <div className='flex items-center gap-1 bg-[#FFA5A5] rounded-[54px] px-2 py-1 text-[#FF4646]'>
                                                <button className='cursor-pointer'>Cancel</button>
                                                <X />
                                            </div>
                                            <div className='flex items-center gap-1 bg-[#E9FFEF] rounded-[54px] px-2 py-1 text-[#409261]'>
                                                <button className='cursor-pointer'>Accept</button>
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