"use client";

import { motion } from "framer-motion";

const PHOTOS = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
];

export default function Gallery() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[var(--pk-gold)] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Capturando o Amor</span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-[#1E261D]">
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
                            <div className="overflow-hidden bg-[var(--pk-stone)] rounded-sm p-2 shadow-sm border border-black/[0.03] transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                <img
                                    src={src}
                                    className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
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
