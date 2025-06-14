import React, { useEffect } from 'react'
import alertIcon from '../assets/alertIcon.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const AlertCard = ({ alertText }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const message = location.state?.message;



    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);


    const formatMessage = (text) => {
        if (!text) return text;

        const words = text.split(' ');
        if (words.length < 2) return text;

        const firstTwoWords = words.slice(0, 1).join(' ');
        const remainingWords = words.slice(1).join(' ');

        return (
            <span>
                <span className="text-green-500 font-semibold">{firstTwoWords}</span>
                {remainingWords && <span> {remainingWords}</span>}
            </span>
        );
    };

    return (
        <div className='flex justify-center items-center h-screen bg-[#00000075]'>

            <div className='bg-bg-app h-[450px] w-[450px]  md:h-[600px] md:w-[600px] rounded-lg  flex justify-evenly  items-center flex-col'>

                <img className='w-20 lg:w-[300px] ' src={alertIcon} alt="alert icon" />

                <p className="text-center px-4">{formatMessage(message)}</p>

                <div className='w-full flex justify-center items-center pt-10'>
                    <Link to="/home" className='bg-primary text-white px-4 py-2 rounded-md w-[70%] text-center'>
                        Ok
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default AlertCard