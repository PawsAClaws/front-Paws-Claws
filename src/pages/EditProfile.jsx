import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import { Camera } from "phosphor-react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../store/getUserSlice.js';
import BASE_URL, { cookies } from '../lib/api.js';

const EditProfile = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.getUser.user);

    console.log(userData);

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    const handleData = async (values) => {
        try {
            const token = cookies.get('token');

            const formData = new FormData();


            for (const key in values) {
                if (values[key]) {
                    formData.append(key, values[key]);
                }
            }
            if (selectedFile) {
                formData.append('photo', selectedFile);
            }

            const response = await axios.put(
                `${BASE_URL}/user`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            console.log(response.data);

        } catch (error) {
            console.log(error);

        }
    };


    const formik = useFormik({
        initialValues: {
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            gender: userData?.gender || '',
            location: userData?.location || '',
            phone: userData?.phone || '',
            birthday: userData?.birthday ? userData.birthday.split('T')[0] : '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values);
            handleData(values);
        }
    });



    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 sm:h-40 bg-gradient-to-r from-orange-300 to-orange-400" />

                <form onSubmit={formik.handleSubmit}>

                    <div className='flex flex-col items-center  gap-4 relative juctify-center '>

                        <div className='relative group w-[100px] h-[100px] md:h-[170px] md:w-[170px] rounded-full overflow-hidden mt-[-50px]'>
                            <img
                                src={selectedFile ? URL.createObjectURL(selectedFile) : userData?.photo}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />

                            <div
                                className="absolute bottom-[25%] right-[25%] md:bottom-[40%] md:right-[40%] rounded-full bg-white p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Camera size={35} />
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                hidden
                                accept="image/*"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                        </div>

                        <div className='flex flex-col items-center md:items-start justify-center'>
                            <div className='text-xl md:text-3xl lg:text-[40px]'> <span>{userData?.firstName}</span> <span>{userData?.lastName}</span> </div>
                            <div className='md:text-2xl text-[#424242] opacity-50'> {userData?.email} </div>
                        </div>

                    </div>


                    <div className='px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 mt-10'>
                        {/* All inputs */}
                        {[
                            { label: 'First Name', name: 'firstName', type: 'text' },
                            { label: 'Last Name', name: 'lastName', type: 'text' },
                            { label: 'Gender', name: 'gender', type: 'text' },
                            { label: 'Country / City', name: 'location', type: 'text' },
                            { label: 'Phone Number', name: 'phone', type: 'text' },
                            { label: 'Birthday', name: 'birthday', type: 'date' }
                        ].map((input, idx) => (
                            <div key={idx}>
                                <label htmlFor={input.name} className="block text-gray-700 mb-1">{input.label}</label>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    id={input.name}
                                    placeholder={`Enter your ${input.label.toLowerCase()}`}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values[input.name]}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none text-sm"
                                />
                            </div>
                        ))}


                    </div>

                    <div className='flex justify-center my-4'>
                        <button type="submit" className="bg-[#FE8E2F] cursor-pointer w-[90%] py-4 text-white text-sm md:text-base rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
