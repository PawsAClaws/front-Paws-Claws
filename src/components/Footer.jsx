import React from 'react'
import { FacebookLogo, X, InstagramLogo, Phone, EnvelopeSimple, MapPin } from "phosphor-react";

export default function Footer() {



    return (

        <div className='bg-[#111827] '>

            <div className='container mx-auto flex-col md:flex-row items-center justify-between flex  py-14'>

                <div className='flex flex-col gap-8 items-center mb-7'>
                    <p className='text-white mb-4'>PetCare</p>
                    <span className='text-[#9CA3AF]'> Your one-stop solution for all pet care needs </span>
                    <div className='text-[#9CA3AF] flex gap-4 text-2xl'>
                        <FacebookLogo />
                        <X />
                        <InstagramLogo />
                    </div>
                </div>

                <div className='text-center  mb-7'>
                    <p className='text-white mb-4'>Quick Links</p>
                    <ul className='flex flex-col gap-4 text-[#9CA3AF]'>
                        <li>About Us</li>
                        <li>Services</li>
                        <li>Shop</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className='text-center  mb-7'>
                    <p className='text-white mb-4'>Services</p>
                    <ul className='flex flex-col gap-4 text-[#9CA3AF]'>
                        <li>Veterinary Care</li>
                        <li>Pet Supplies</li>
                        <li>Adoption</li>
                        <li>Marketplace</li>
                    </ul>
                </div>


                <div className='text-center  mb-7'>
                    <p className='text-white mb-4'>Contact Us</p>

                    <div className='flex flex-col gap-3'>
                        <div className='text-[#9CA3AF] flex items-center gap-1'>
                            <Phone />
                            <div className='text-[#9CA3AF]'>+1 (555) 123-4567</div>
                        </div>

                        <div className='text-[#9CA3AF] flex items-center gap-1'>
                            <EnvelopeSimple />
                            <div className='text-[#9CA3AF]'>info@petcare.com</div>
                        </div>

                        <div className='text-[#9CA3AF] flex items-center gap-1'>
                            <MapPin />
                            <div className='text-[#9CA3AF]'>123 Pet Street, City</div>
                        </div>
                    </div>

                </div>



            </div>

            <div className='text-center text-[#9CA3AF] border-t py-4'> © 2025 PetCare. All rights reserved. </div>

        </div>
    )
}
