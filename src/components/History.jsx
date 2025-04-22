import React from "react";
import { ClockCounterClockwise } from "phosphor-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles

export default function History() {
    const history = [
        { name: "In Dogs - golden dog", new: "+1 New ad" },
        { name: "In Cat - Kitty", new: "+2 New ad" },
        { name: "In Bird - Parrot", new: "+3 New ad" },
        { name: "In Dogs - golden dog", new: "+4 New ad" },
        { name: "In Bird - Parrot", new: "+5 New ad" },
        { name: "In Cat - Kitty", new: "+6 New ad" },
        { name: "In Dogs - golden dog", new: "+1 New ad" },
        { name: "In Cat - Kitty", new: "+2 New ad" },
        { name: "In Bird - Parrot", new: "+3 New ad" },
        { name: "In Dogs - golden dog", new: "+4 New ad" },
        { name: "In Bird - Parrot", new: "+5 New ad" },
        { name: "In Cat - Kitty", new: "+6 New ad" },
        { name: "In Dogs - golden dog", new: "+1 New ad" },
        { name: "In Cat - Kitty", new: "+2 New ad" },
        { name: "In Bird - Parrot", new: "+3 New ad" },
        { name: "In Dogs - golden dog", new: "+4 New ad" },
        { name: "In Bird - Parrot", new: "+5 New ad" },
        { name: "In Cat - Kitty", new: "+6 New ad" },
    ];

    return (
        <div className="w-full px-4">
            <Swiper
                spaceBetween={14}
                slidesPerView={"auto"}

            >
                {history.map((item, index) => (

                    <SwiperSlide key={index} className="o  overflow-hidden max-w-fit">
                        <div className="border border-[#A5A5A5] py-2.5 px-1.5 rounded-sm  w-fit ">
                            <div className="flex items-center gap-2">
                                <ClockCounterClockwise className="text-primary text-3xl" />
                                <div>
                                    <p>{item.name}</p>
                                    <p className="text-[#707070]">{item.new}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
