import { div } from 'framer-motion/client';
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProutectedRoutes = (props) => {


    let token = localStorage.getItem('token');


    if (token !== null) {

        return props.children

    } else {

        return (

            <Navigate to="/" />


        )

    }



}

export default ProutectedRoutes