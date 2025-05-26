import React from 'react'
import notFoundPage from '../assets/notFoundPage.png'


const NotFound = () => {
    return (
        <div className='text-3xl h-screen w-full   '>
            <img className='w-full h-full' src={notFoundPage} alt=" not found " />
        </div>
    )
}

export default NotFound