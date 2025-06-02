// import React, { useEffect, useState } from 'react'
// import { ShareNetwork, Flag, Eye, User } from "phosphor-react";
// import avatar from '../assets/avatar.png'
// import { Link, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getUserId } from '../lib/getUserId.js';




// const UserProfile = () => {


//     const [userAds, setUserAds] = useState({});

//     const { id } = useParams();





//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const day = date.getDate();
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear().toString().slice(-2);
//         return `${day}/${month}/${year}`;
//     };




//     useEffect(() => {



//         const getAdsData = async () => {

//             try {

//                 const data = await getUserId(id);

//                 console.log(data);


//                 setUserAds(data);

//             } catch (error) {
//                 console.log(error);
//             }
//         }

//         getAdsData();

//     }, [])



//     const handleShare = async () => {
//         try {
//             await navigator.clipboard.writeText(window.location.href);
//             toast.success("Link copied to clipboard");
//         } catch (error) {
//             console.error('Failed to copy: ', error);
//         }
//     }




//     return (

//         <div className='bg-[#F9FAFB]'>

//             <div className='w-full  '>
//                 <img className='w-full ' src="https://as2.ftcdn.net/jpg/03/92/52/79/1000_F_392527967_xgcCQDVgieIQRNh3EbbOkS5AXcGsqzye.jpg" alt="banner" />
//             </div>

//             <div className='container mx-auto '>

//                 <div className='flex flex-col md:flex-row md:justify-between items-center gap-4 text-center'>

//                     <div className='flex flex-col items-center md:flex-row gap-4 relative'>
//                         <div className='w-[100px] h-[100px] md:h-[240px] md:w-[240px] rounded-full overflow-hidden mt-[-50px]'>
//                             <img src={userAds.photo ? userAds.photo : avatar} alt="" />
//                         </div>

//                         <div className='flex flex-col items-center md:items-start justify-center'>
//                             <div className='text-xl md:text-3xl lg:text-[40px]'> <span>{userAds?.firstName}</span> <span>{userAds?.lastName}</span> </div>
//                             <div className='md:text-2xl text-[#424242] opacity-50'> {userAds?.email} </div>
//                         </div>
//                     </div>

//                     <div className='flex gap-6 justify-center md:justify-end text-xl'>

//                         <div onClick={handleShare} className='flex gap-2 items-center cursor-pointer'>
//                             <ShareNetwork />
//                             <span> share </span>
//                         </div>
//                         <div className='flex gap-2 items-center'>
//                             <Flag />
//                             <span> Report </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mt-20 flex items-center gap-4'>

//                     <div className='capitalize'> user ads </div>

//                     <div className='bg-primary w-10 h-10 rounded-full text-white flex items-center justify-center'> {userAds.length} </div>


//                 </div>


//                 <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-[20%]'>


//                     {

//                         userAds.map((item, index) => {

//                             return (
//                                 <div key={index} className='rounded-[8px] overflow-hidden'>

//                                     <div className='bg-[#F6EBE1] flex gap-5 p-3.5'>

//                                         <div> <img
//                                             className='w-[220px] h-[200px] object-cover '
//                                             src={item.photo}
//                                             alt={item.title}
//                                         />  </div>

//                                         <div className='flex flex-col gap-2'>
//                                             <div className='text-xl'> {item.title} </div>
//                                             <div className='text-[#5F5B5B]'> {item.description} </div>
//                                             <div> {item.price} </div>
//                                             <div>{item.type}  </div>
//                                         </div>

//                                     </div>

//                                     <div className='bg-white p-3.5'>
//                                         <div className='flex flex-col gap-6  '>

//                                             <div className='flex justify-between mt-[18px]'>
//                                                 <div> Published on  {item.createdAt ? formatDate(item.createdAt) : ''} </div>

//                                                 <div className='bg-[#999999] w-fit px-[18px] py-1.5 rounded-[30px]'> live </div>

//                                             </div>

//                                             <div className='flex justify-between '>

//                                                 <div className='flex gap-2 items-center'>
//                                                     <div className='bg-[#F4F4F4] w-[40px] h-[40px] flex justify-center items-center text-[30px]'><Eye />  </div>
//                                                     <span>500</span> views </div>

//                                                 <div className='flex gap-2 items-center'>
//                                                     <div className='bg-[#F4F4F4] w-[40px] h-[40px] flex justify-center items-center text-[30px]'> <User />  </div>
//                                                     <span>80</span> Leads </div>

//                                             </div>

//                                         </div>




//                                     </div>

//                                 </div>

//                             )

//                         })
//                     }






//                 </div>


//             </div>



//         </div>


//     )

// }

// export default UserProfile