import { nav } from 'framer-motion/client';
import React from 'react'
import { Navigate } from 'react-router-dom'
import { cookies } from '../../lib/api';


const MyToken = () => {

    let token = cookies.get('token');

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