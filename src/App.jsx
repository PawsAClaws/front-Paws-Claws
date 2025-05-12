import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import GuestLayout from './components/layout/GuestLayout';
import UserLayout from './components/layout/UserLayout';
import Home from './pages/Home';
import HomeLogin from './pages/HomeLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import Adoption from './pages/Adoption';
import Animals from './pages/Animals';
import Doctors from './pages/Doctors';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProutectedRoutes from './components/protectedRoutes/ProutectedRoutes';
import { ToastContainer } from 'react-toastify';
import Terms from './components/Terms ';
import Policy from './components/Policy';
import About from './components/About';
import SearchItems from './pages/SearchItems';
import MyWishLists from './pages/myWishLists';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import EditProfile from './pages/EditProfile';
import DoctorDetails from './pages/DoctorDetails';
import DoctorPage from './pages/DoctorPage';
import BecomeDoctor from './components/BecomeDoctor';
import BookingSteps from './components/BookingSteps';

export default function App() {




  const routes = createBrowserRouter([

    // GuestLayout
    {
      element: <GuestLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/terms', element: <Terms /> },
        { path: '/policy', element: <Policy /> },
        { path: '/about', element: <About /> },
        { path: '*', element: <NotFound /> },
        { path: "/doctors", element: <Doctors /> },
        { path: "/doctorDetail/:id", element: <DoctorDetails /> },
        { path: "/doctorPage", element: <DoctorPage /> },
        { path: "/becomeDoctor", element: <BecomeDoctor /> },
        { path: "/booking", element: <BookingSteps /> },
      ]
    },

    // UserLayout
    {
      element: <ProutectedRoutes> <UserLayout /></ProutectedRoutes>,
      children: [
        { path: '/home', element: <HomeLogin /> },
        { path: '/createPost/:id', element: <CreatePost /> },
        { path: '/postDetails/:id', element: <PostDetails /> },
        { path: '/adoption', element: <Adoption /> },
        { path: '/animals', element: <Animals /> },
        { path: '/doctors', element: <Doctors /> },
        { path: '/shop', element: <Shop /> },
        { path: '/categories', element: <Categories /> },
        { path: '/profile', element: <Profile /> },
        { path: "/search", element: <SearchItems /> },
        { path: "/myWishlist", element: <MyWishLists /> },
        { path: "/editProfile", element: <EditProfile /> },

      ]
    },


    {
      path: '/login', element: <Login />
    },
    {
      path: '/register', element: <Register />
    },
    {
      path: '/forgetPassword', element: <ForgetPassword />
    },
    {
      path: '/resetPassword/:token', element: <ResetPassword />
    },

  ]);

  return (
    <div className='font-Quicksand'>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' autoClose={1200} />
    </div>
  );
}
