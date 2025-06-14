import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';
import Terms from './components/Terms ';
import Policy from './components/Policy';
import About from './components/About';
import SearchItems from './pages/SearchItems';
import MyWishLists from './pages/MyWishLists';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import EditProfile from './pages/EditProfile';
import DoctorDetails from './pages/DoctorDetails';
import DoctorPage from './pages/DoctorPage';
import BecomeDoctor from './components/BecomeDoctor';
import BookingSteps from './components/BookingSteps';
import DoctorMap from './pages/DoctorMap';
import ChatRoom from './pages/chat/ChatRoom';
import ProtectedRoute from './components/protectedRoutes/ProutectedRoutes';
import './i18n';
import AlertCard from './components/AlertCard';
import UserProfile from './pages/UserProfile';
import Reservations from './pages/Reservations';





export default function App() {
  const routes = createBrowserRouter([
    // GuestLayout 
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'terms', element: <Terms /> },
        { path: 'policy', element: <Policy /> },
        { path: 'about', element: <About /> },
        { path: 'adoption', element: <Adoption /> },
        { path: 'animals', element: <Animals /> },
        { path: 'doctors', element: <Doctors /> },
        { path: 'shop', element: <Shop /> },
        { path: "search", element: <SearchItems /> },
        { path: "doctorMap", element: <DoctorMap /> },
        { path: '*', element: <NotFound /> },
      ]
    },

    // UserLayout   
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: 'home', element: <HomeLogin /> },
        { path: 'createPost/:id', element: <CreatePost /> },
        { path: 'postDetails/:id', element: <PostDetails /> },
        { path: 'categories', element: <Categories /> },
        { path: 'profile', element: <Profile /> },
        { path: "myWishlist", element: <MyWishLists /> },
        { path: "editProfile", element: <EditProfile /> },
        { path: "doctorDetail/:id", element: <DoctorDetails /> },
        { path: "userProfile/:id", element: <UserProfile /> },
        { path: "doctorPage", element: <DoctorPage /> },
        { path: "becomeDoctor", element: <BecomeDoctor /> },
        { path: "booking", element: <BookingSteps /> },
        { path: "chatRoom/:id?", element: <ChatRoom /> },
        { path: "alertCard", element: <AlertCard /> },
        { path: "reservations", element: <Reservations /> },
      ]
    },

    // Authentication Routes
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'forgetPassword',
      element: <ForgetPassword />
    },
    {
      path: 'resetPassword/:token',
      element: <ResetPassword />
    },
  ]);

  return (
    <div className='font-Quicksand'>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' autoClose={1200} />
    </div>
  );
}