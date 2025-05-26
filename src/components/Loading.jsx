import React from "react";
import { FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";

const pawVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.3, // كل ما العنصر أقرب للأسفل، يتأخر أكثر
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        },
    }),
};

const Loading = () => {
    return (
        <div className="flex flex-col-reverse items-center justify-center h-screen gap-4 text-orange-500">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={pawVariants}
                    className={i === 1 ? "mr-8" : ""}
                >
                    <FaPaw size={50} />
                </motion.div>
            ))}
        </div>
    );
};

export default Loading;
