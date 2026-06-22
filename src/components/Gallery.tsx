"use client";

import { motion } from "framer-motion";

import Image from "next/image";

const PHOTOS = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
];

export default function Gallery() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[var(--pk-gold)] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Capturando o Amor</span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-[var(--pk-charcoal)]">
                        Momentos Preciosos
                    </h2>
                    <div className="w-24 h-[1px] bg-[var(--pk-gold-dim)]/30 mx-auto mt-8" />
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {PHOTOS.map((src, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid group relative"
                        >
                            <div className="relative overflow-hidden bg-[var(--pk-stone)] rounded-sm p-2 shadow-sm border border-black/[0.03] transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 aspect-[4/5]">
                                <Image
                                    src={src}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                    alt="Momento do casamento"
                                />
                                <div className="absolute inset-2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                    <span className="text-white font-[family-name:var(--font-playfair)] italic text-lg">Eternidade...</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Smooth gradient transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--pk-cream)] pointer-events-none" />
        </section>
    );
}
