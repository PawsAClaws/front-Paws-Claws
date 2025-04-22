import { nav } from 'framer-motion/client';
import React from 'react'
import { Navigate } from 'react-router-dom'


const MyToken = () => {

    let token = localStorage.getItem('token');

    if (token !== null) {

        return <Navigate to="/home" />

    } else {


    }




    return (
        <div>

        </div>
    )
}

export default MyToken