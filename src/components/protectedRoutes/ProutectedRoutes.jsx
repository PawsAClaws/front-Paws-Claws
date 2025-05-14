import { div } from 'framer-motion/client';
import React from 'react'
import { Navigate } from 'react-router-dom'
import { cookies } from '../../lib/api';

const ProutectedRoutes = (props) => {


    let token = cookies.get('token');


    if (token !== null) {

        return props.children

    } else {

        return (

            <Navigate to="/" />


        )

    }



}

export default ProutectedRoutes