"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2027-01-01T16:00:00");

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            const now = new Date();
            const difference = TARGET_DATE.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isMounted) return <div className="h-64 bg-white" />;

    return (
        <section className="py-24 bg-white text-[var(--pk-text-main)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[var(--pk-stone)]" />
            <div className="container mx-auto px-4 text-center">
                <p className="text-[var(--pk-gold)] uppercase tracking-[0.4em] mb-10 text-sm font-bold">Contagem Regressiva</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-5xl mx-auto">
                    <TimeUnit value={timeLeft.days} label="Dias" />
                    <TimeUnit value={timeLeft.hours} label="Horas" />
                    <TimeUnit value={timeLeft.minutes} label="Minutos" />
                    <TimeUnit value={timeLeft.seconds} label="Segundos" />
                </div>
            </div>
        </section>
    );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative group">
                <div className="absolute inset-0 bg-[var(--pk-gold)]/10 blur-xl rounded-full group-hover:bg-[var(--pk-gold)]/20 transition-all duration-500" />
                <motion.div
                    key={value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative text-6xl md:text-8xl font-[family-name:var(--font-playfair)] text-[var(--pk-gold-dim)] mb-2 z-10 tabular-nums"
                >
                    {String(value).padStart(2, '0')}
                </motion.div>
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-[var(--pk-text-muted)] font-bold relative z-10 border-t border-[var(--pk-gold-dim)]/30 pt-2 mt-2 w-full text-center">{label}</span>
        </div>
    );
}
