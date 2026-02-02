"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen overflow-hidden flex items-center justify-center">
            {/* Background Image (Restored) */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 bg-cover bg-center"
            >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#1E261D]" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-[var(--pk-accent)] uppercase tracking-[0.5em] text-sm md:text-lg mb-4 font-[family-name:var(--font-lato)]"
                >
                    Nós vamos nos casar
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-[family-name:var(--font-playfair)] text-6xl md:text-9xl lg:text-[10rem] text-[var(--pk-gold)] mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-tight"
                >
                    Gustavo & Jessica
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    <p className="text-white/80 font-[family-name:var(--font-lato)] tracking-[0.3em] text-sm md:text-base uppercase">
                        28 de Novembro de 2026 • Às 17:00 • Toscana, Itália
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
            >
                <ArrowDown size={32} />
            </motion.div>
        </div>
    );
}
