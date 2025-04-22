import React from 'react'
import { Link } from 'react-router-dom'

const Policy = () => {



    return (

        <div>

            <div className='container mx-auto py-28 '>

                <div className='w-full md:w-3/4 lg:w-1/2'>
                    <h6 className='text-3xl'> 🔒 Privacy Policy </h6>

                    <p className='mt-5 mb-14'>
                        We care about your privacy (almost as much as pets care about treats 🍪). Here’s how we handle your info
                    </p>

                    <ol className="list-decimal ps-5 flex flex-col gap-10">
                        <li>
                            <span className='font-semibold'> 🧾 What We Collect </span>
                            <p>We collect:</p>
                            <ul className="list-disc ps-5">
                                <li> Account info: name, email, location </li>
                                <li>Listings info: animal photos, descriptions, prices</li>
                                <li> Usage data: which pets you view, favorite, etc.</li>
                            </ul>
                        </li>

                        <li>
                            <span className='font-semibold'>  📦 How We Use It </span>

                            <p> We use your info to:</p>
                            <ul className="list-disc ps-5">
                                <li> Help you post or find the right animals</li>
                                <li> Keep the app running smoothly</li>
                                <li> Improve your experience (like showing you nearby pets)</li>
                            </ul>
                            <p className='text-[#FF4646]'>We do NOT sell your info. Ever.</p>
                        </li>

                        <li>
                            <span className='font-semibold'> 🍪 Cookies (Not the snack kind) </span>
                            <p> We use cookies and similar tools to:</p>

                            <ul className="list-disc ps-5">
                                <li>Keep you logged in </li>
                                <li> Remember your preferences</li>
                                <li> Make the app better for you</li>
                            </ul>
                        </li>


                        <p> You can disable cookies in your browser/app settings. </p>

                        <li> ️
                            <span className='font-semibold'> 🛡️ Your Rights </span>
                            <p> You can: </p>

                            <ul className='list-disc ps-5'>
                                <li> Edit your profile at any time </li>
                                <li> Request your data or ask us to delete it </li>
                                <li> Report privacy concerns to our team </li>
                            </ul>

                        </li>





                        <li>
                            <span className='font-semibold'> 🧠 Stay Safe! </span>
                            <ul className='list-disc ps-5'>
                                <li> Don’t share personal or financial info with strangers </li>
                                <li> Report suspicious messages or listings </li>
                                <li> Meet in public when handing off pets </li>
                            </ul>

                        </li>

                        <li>
                            <span className='font-semibold'> 📬 Talk to Us </span>
                            <div className='mt-5'> Have questions? We’re all ears 🐰 </div>
                            <span> Email: <a href="#"> petersamros@gmail.com </a> </span>

                        </li>



                    </ol>
                </div>



            </div>

            <div className='bg-primary '>

                <div className='container mx-auto flex justify-center items-center flex-col h-[250px] gap-6'>

                    <h5 className='text-white text-xl md:text-3xl'>ready to find your perfect pet?</h5>
                    <p className='text-white md:text-[20px]'>join thousands of happy pet owners in our comunity</p>

                    <div className='flex gap-4 '>

                        <Link to="/register" className='bg-white py-3 px-10  text-primary rounded-2xl cursor-pointer'> Get Started </Link>



                    </div>

                </div>

            </div>

        </div>

    )



}

export default Policy