import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {



    return (
        <div>

            <div className='container mx-auto py-28 '>

                <div className='w-full md:w-3/4 lg:w-1/2 text-xl'>

                    <h6 className='text-3xl'> 🐾 About Us </h6>

                    <p className='mt-5 mb-14'>
                        Welcome to <span className='text-primary'>Paws&Claws</span> – where every paw has a place to call home! 🐶🐱
                        We’re a global community built for pet lovers, by pet lovers.
                        Whether you’re looking to adopt, buy, or responsibly sell animals,
                        we’re here to help you connect with caring people and give animals the love-filled lives they deserve.
                        But we’re more than just a pet marketplace…
                    </p>

                    <ol className="list-decimal ps-5 flex flex-col gap-10">

                        <li>
                            <span className='font-semibold'> 💙 Our Mission</span>
                            <p> At Paws&Claws, our mission is simple:
                                Help animals find warm, safe homes—and support the amazing humans who care for them.</p>
                        </li>


                        <li>
                            <span className='font-semibold'>  That means:</span>
                            <ul className="list-disc ps-5">
                                <li> Helping you find your next furry best friend 🐕 </li>
                                <li>Connecting responsible sellers and buyers 🐾</li>
                                <li>Making adoption easier for both pets and people 🏡</li>
                            </ul>

                        </li>

                        <li>
                            <span className='font-semibold'>  🩺 Beyond Buying & Adopting</span>
                            <p> We’re also here when your pet needs a little extra TLC.
                                With Paws&Claws, you can:</p>
                            <ul className="list-disc ps-5">
                                <li> Find the nearest vet or animal clinic</li>
                                <li>Discover trusted pet services in your area (groomers, trainers & more)</li>
                                <li> Shop for products your pets will love, from toys to treats</li>
                            </ul>
                        </li>

                        <li>
                            <span className='font-semibold'> 🌍 A Global Pet Family</span>
                            <p>No matter where you are, Paws&Claws brings animal lovers together from around the world.
                                Because pets don’t just need homes—they need the right homes. And that’s where you come in.

                                So whether you’re welcoming a new puppy, finding a forever home for a kitten, or just looking for a cozy bed for your senior dog—we’re here to help.

                                Thanks for being part of the Paws&Claws family. Let’s give every pet the life they deserve. 🐾❤️
                                Would you like me to turn this into a webpage format or add images, icons, or a CTA (like a “Start Exploring” button)? </p>

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

export default About