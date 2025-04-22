import { div } from 'framer-motion/client'
import React from 'react'
import { Link } from 'react-router-dom'

const Terms = () => {
    return (

        <div>

            <div className='container mx-auto py-28 '>

                <div className='w-full md:w-3/4 lg:w-1/2'>
                    <h6 className='text-3xl'> 📝 Terms and Conditions of Service </h6>

                    <p className='mt-5 mb-14'>
                        Welcome to <span className='text-primary'>Paws&Claws</span> – where pets find their people! 🐶🐱
                        Whether you’re looking to adopt, buy, or sell animals responsibly, these terms keep things safe and fair for everyone.
                    </p>

                    <ol className="list-decimal ps-5 flex flex-col gap-10">
                        <li>
                            <span className='font-semibold'>🐾 Using Our App</span>
                            <p>By creating an account and using our app, you agree to:</p>
                            <ul className="list-disc ps-5">
                                <li>Be honest in your listings and interactions</li>
                                <li>Use the platform only for legal and ethical pet transactions</li>
                                <li>Respect other users (and their furry friends!)</li>
                                <li>Not post anything harmful, fake, or misleading</li>
                            </ul>
                        </li>

                        <li>
                            <span className='font-semibold'> 🐶 For Pet Sellers</span>
                            <p>If you’re listing an animal:</p>
                            <ul className="list-disc ps-5">
                                <li>Only post real, accurate info about the animal</li>
                                <li>Treat animals humanely (we care deeply about their welfare 🐕💖)</li>
                                <li>Follow your local laws for animal selling/trading</li>
                            </ul>
                            <p>🚨 Safety Tip: Always meet buyers in safe, public places. Never force animals into unsafe or unhealthy environments.</p>
                        </li>

                        <li>
                            <span className='font-semibold'> 🐱 For Pet Buyers & Adopters</span>
                            <p>If you’re buying or adopting:</p>
                            <ul className="list-disc ps-5">
                                <li>Make sure you’re ready for the responsibility of a pet</li>
                                <li>Ask the seller the right questions about health, history, and care</li>
                                <li>Follow up with vet visits, proper food, and lots of love 🐾</li>
                            </ul>
                        </li>


                        <p> ⚠️ Important: We’re not responsible for the behavior,
                            health, or legitimacy of animals listed.
                            It’s up to buyers and sellers to verify all details. </p>

                        <li>
                            <span className='font-semibold'> 🚫 What Not to Do</span>
                            <ul className='list-disc ps-5'>
                                <li> No selling endangered or banned species </li>
                                <li> No abusive, harmful, or scammy behavior </li>
                                <li> No fake listings or impersonation </li>
                            </ul>
                        </li>


                        <p className='text-[#FF4646]'> We have the right to remove content or accounts that break these rules. </p>

                        <li><span className='font-semibold'> 📨 Contact Us</span> </li>
                        <div> Need help or want to report something suspicious? </div>
                        <span> Email: <a href="#"> petersamros@gmail.com </a> </span>
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

export default Terms
