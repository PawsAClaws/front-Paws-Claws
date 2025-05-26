// import React from 'react';
// import NavbarLogin from '../NavbarLogin';
// import { Outlet } from 'react-router-dom';
// import Footer from '../Footer';
// import { useSelector } from 'react-redux';
// import BecomeDoctor from '../BecomeDoctor';

// const UserLayout = () => {
//     const showCard = useSelector((state) => state.card.showCard);

//     return (
//         <div className='relative'>
//             <NavbarLogin />

//             {showCard && (
//                 <div className='fixed top-0 left-0 w-full h-full z-50 bg-black/50 overflow-y-auto'>
//                     <div className='min-h-screen flex items-center justify-center px-4 py-8'>
//                         <div className="w-full max-w-[900px] bg-white rounded-xl ">
//                             <BecomeDoctor />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <Outlet />
//             <Footer />
//         </div>
//     );
// };

// export default UserLayout;
