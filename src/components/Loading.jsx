import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import React from "react";



export default function Loading() {
    const paws = Array.from({ length: 8 });

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="relative w-40 h-40">
                {paws.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2"
                        style={{ originX: 0.5, originY: 0.5 }}
                        animate={{
                            rotate: [0, -360],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "linear",
                            delay: i * 0.5,
                        }}
                    >
                        <div
                            style={{
                                transform: `translateX(70px)`,
                            }}
                        >
                            <FaPaw className="text-orange-500 text-2xl" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}