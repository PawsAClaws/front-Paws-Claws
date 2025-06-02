import React from 'react'
import { FacebookLogo, X, InstagramLogo, Phone, EnvelopeSimple, MapPin } from "phosphor-react";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <div className='bg-[#111827] '>
            <div className='container mx-auto flex-col md:flex-row items-center justify-between flex  py-14'>

                <div className='flex flex-col gap-8 items-center mb-7'>
                    <p className='text-white mb-4'>{t('footer.petCare')}</p>
                    <span className='text-[#9CA3AF]'>{t('footer.p_1')}</span>
                    <div className='text-[#9CA3AF] flex gap-4 text-2xl'>
                        <FacebookLogo />
                        <X />
                        <InstagramLogo />
                    </div>
                </div>

                <div className='text-center mb-7'>
                    <p className='text-white mb-4'>{t('footer.quickLinks')}</p>
                    <ul className='flex flex-col gap-4 text-[#9CA3AF]'>
                        <li>{t('footer.aboutUs')}</li>
                        <li>{t('footer.services')}</li>
                        <li>{t('footer.shop')}</li>
                        <li>{t('footer.contactUs')}</li>
                    </ul>
                </div>

                <div className='text-center mb-7'>
                    <p className='text-white mb-4'>{t('footer.services')}</p>
                    <ul className='flex flex-col gap-4 text-[#9CA3AF]'>
                        <li>{t('footer.veterinaryCare')}</li>
                        <li>{t('footer.petSupplies')}</li>
                        <li>{t('footer.adoption')}</li>
                        <li>{t('footer.marketplace')}</li>
                    </ul>
                </div>

                <div className='text-center mb-7'>
                    <p className='text-white mb-4'>{t('footer.contactUs')}</p>

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