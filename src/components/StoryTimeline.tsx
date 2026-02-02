"use client";

import { motion, useScroll, } from "framer-motion";
import { useRef } from "react";

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
        <section ref={containerRef} className="py-32 bg-[#1E261D] text-white relative overflow-hidden">
            {/* Elegant transition to white */}
            <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white via-white/20 to-transparent z-10" />

            <div className="container mx-auto px-4 relative z-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[var(--pk-gold)] mb-20"
                >
                    Nossa História
                </motion.h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--pk-gold)] origin-top -translate-x-1/2 transform"
                    />

                    <div className="space-y-32">
                        {EVENTS.map((event, index) => (
                            <TimelineItem key={index} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ event, index }: { event: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex items-center justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
        >
            <div className="w-1/2 pr-12 pl-12">
                <div className={`${isEven ? 'text-right' : 'text-left'}`}>
                    <span className="text-[var(--pk-gold)] font-bold text-lg">{event.year}</span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl my-2">{event.title}</h3>
                    <p className="font-[family-name:var(--font-lato)] text-[var(--pk-text-muted)]">{event.description}</p>
                </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--pk-gold)] border-4 border-[var(--background)] z-10" />

            <div className="w-1/2 pl-12 pr-12">
                <div className="overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-500">
                    <img src={event.image} alt={event.title} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
                </div>
            </div>
        </motion.div>
    );
}
