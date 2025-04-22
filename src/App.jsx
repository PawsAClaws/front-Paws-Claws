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
import Location from './lib/location';
import ProutectedRoutes from './components/protectedRoutes/ProutectedRoutes';
import { ToastContainer } from 'react-toastify';
import Terms from './components/Terms ';
import Policy from './components/Policy';
import About from './components/About';

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
        { path: '*', element: <NotFound /> }
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
        { path: '/location', element: <Location /> },
        { path: '/profile', element: <Profile /> },
      ]
    },


    {
      path: '/login', element: <Login />
    },
    {
      path: '/register', element: <Register />
    },

  ]);

  return (
    <div className='font-Quicksand'>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' autoClose={1200} />
    </div>
  );
}
