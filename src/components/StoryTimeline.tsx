"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import { Heart, Home, Sparkles } from "lucide-react";

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    image: string;
    icon: React.ElementType;
}

const EVENTS: TimelineEvent[] = [
    {
        year: "2018",
        title: "O Primeiro Olhar",
        description: "Nos conhecemos em um café no centro. Estava chovendo, parecia uma cena de filme.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
        icon: Home
    },
    {
        year: "2020",
        title: "O Sim",
        description: "Durante uma trilha ao pôr do sol, o pedido aconteceu. A resposta foi um 'Sim' imediato!",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
        icon: Heart
    },
    {
        year: "2026",
        title: "O Grande Dia",
        description: "Convidamos você para celebrar o início do nosso 'para sempre'.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        icon: Sparkles
    }
];

export default function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={containerRef} className="py-32 bg-[var(--pk-charcoal)] text-white relative overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none mix-blend-overlay" />

            {/* Seamless gradient transition from Hero */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[var(--pk-charcoal)] via-[var(--pk-charcoal)] to-transparent z-10" />

            <div className="container mx-auto px-4 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32 relative"
                >
                    <span className="text-[var(--pk-gold)] uppercase tracking-[0.4em] text-xs font-bold mb-4 block animate-pulse">Nossa Jornada</span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-white drop-shadow-2xl">
                        História de Amor
                    </h2>
                    <div className="w-24 h-[1px] bg-[var(--pk-gold)]/50 mx-auto mt-8" />
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/20 md:-translate-x-1/2 rounded-full">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-[var(--pk-gold)] shadow-[0_0_15px_var(--pk-gold)]"
                        />
                    </div>

                    <div className="space-y-40">
                        {EVENTS.map((event, index) => (
                            <TimelineItem key={index} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Transition to next section - Dark to next theme or maintain dark */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--pk-charcoal)] to-transparent z-10" />
        </section>
    );
}

function TimelineItem({ event, index }: { event: TimelineEvent, index: number }) {
    const isEven = index % 2 === 0;
    const Icon = event.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Content Side with Glassmorphism Card */}
            <div className={`w-full md:w-5/12 pl-20 md:pl-0 relative z-10 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                <div className={`
                    relative p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5 
                    hover:bg-white/10 transition-all duration-500 shadow-xl group
                    ${isEven ? 'md:hover:-translate-x-2' : 'md:hover:translate-x-2'}
                `}>
                    <span className="text-[var(--pk-gold)] font-bold text-7xl opacity-20 font-[family-name:var(--font-playfair)] absolute -top-10 left-4 md:left-auto md:right-4 z-0">{event.year}</span>
                    <div className="relative z-10">
                        <h3 className="font-[family-name:var(--font-playfair)] text-4xl mb-4 text-white group-hover:text-[var(--pk-gold)] transition-colors duration-300">{event.title}</h3>
                        <p className="font-[family-name:var(--font-lato)] text-gray-300 text-lg leading-relaxed">{event.description}</p>
                    </div>
                </div>
            </div>

            {/* Center Icon (Desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--pk-charcoal)] border-2 border-[var(--pk-gold)] flex items-center justify-center shadow-[0_0_20px_rgba(184,134,11,0.3)]">
                    <Icon className="text-[var(--pk-gold)] w-6 h-6" />
                </div>
            </div>

            {/* Mobile Icon */}
            <div className="absolute left-[28px] -translate-x-1/2 top-8 z-20 md:hidden flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[var(--pk-charcoal)] border-2 border-[var(--pk-gold)] flex items-center justify-center shadow-[0_0_15px_rgba(184,134,11,0.3)]">
                    <Icon className="text-[var(--pk-gold)] w-5 h-5" />
                </div>
            </div>

            {/* Image Side with Parallax & Hover Effect */}
            <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border-2 border-white/10 hover:border-[var(--pk-gold)]/50 transition-all duration-500 hover:scale-[1.02]">
                    <ParallaxImage
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full scale-110 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
            </div>
        </motion.div>
    );
}
