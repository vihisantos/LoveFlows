"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";

const EVENTS = [
    {
        year: "2018",
        title: "O Primeiro Olhar",
        description: "Nos conhecemos em um café no centro. Estava chovendo, parecia uma cena de filme.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
    },
    {
        year: "2020",
        title: "O Sim",
        description: "Durante uma trilha ao pôr do sol, o pedido aconteceu. A resposta foi um 'Sim' imediato!",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
    },
    {
        year: "2026",
        title: "O Grande Dia",
        description: "Convidamos você para celebrar o início do nosso 'para sempre'.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    }
];

export default function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={containerRef} className="py-32 bg-[var(--pk-cream)] text-[var(--pk-charcoal)] relative overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

            {/* Elegant transition from previous section */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />

            <div className="container mx-auto px-4 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-[var(--pk-gold)] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Nossa Jornada</span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-[var(--pk-charcoal)]">
                        História de Amor
                    </h2>
                    <div className="w-24 h-[1px] bg-[var(--pk-gold-dim)]/30 mx-auto mt-8" />
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[var(--pk-gold)] origin-top md:-translate-x-1/2"
                    />

                    <div className="space-y-32">
                        {EVENTS.map((event, index) => (
                            <TimelineItem key={index} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Elegant transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
        </section>
    );
}

function TimelineItem({ event, index }: { event: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Content Side */}
            <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <span className="text-[var(--pk-gold)] font-bold text-6xl opacity-20 font-[family-name:var(--font-playfair)] block -mb-4">{event.year}</span>
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl mb-4 text-[#1E261D]">{event.title}</h3>
                <p className="font-[family-name:var(--font-lato)] text-[var(--pk-text-muted)] text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Center Dot (Desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--pk-gold)] border-4 border-[var(--pk-cream)] z-10 hidden md:block" />

            {/* Mobile Dot */}
            <div className="absolute left-[20px] w-4 h-4 rounded-full bg-[var(--pk-gold)] border-4 border-[var(--pk-cream)] z-10 md:hidden -translate-x-1/2" />

            {/* Image Side with Parallax */}
            <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                    <ParallaxImage
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
            </div>
        </motion.div>
    );
}
