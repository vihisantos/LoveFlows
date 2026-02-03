"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
    // Split text into words/letters
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(5px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap justify-center ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="mr-[0.25em] inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
