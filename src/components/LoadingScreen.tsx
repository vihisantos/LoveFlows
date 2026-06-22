"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [complete, setComplete] = useState(false);
    const [loadingText, setLoadingText] = useState("Noivo & Noiva");

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setLoadingText("01 . 01 . 2027");
        }, 2000);

        const timer2 = setTimeout(() => {
            setLoadingText("Live the Love");
        }, 4000);

        const timer3 = setTimeout(() => {
            setComplete(true);
        }, 5500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--pk-charcoal)] text-white"
                >
                    <div className="text-center relative">
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none opacity-20 animate-[spin_8s_linear_infinite]">
                            <circle cx="150" cy="150" r="148" fill="none" stroke="var(--pk-gold)" strokeWidth="1" strokeDasharray="10 10" />
                        </svg>

                        <motion.h1
                            key={loadingText}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[var(--pk-gold)]"
                        >
                            {loadingText}
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 200 }}
                            transition={{ duration: 5.5, ease: "linear" }}
                            className="h-px bg-[var(--pk-gold)]/50 mt-8 mx-auto"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
