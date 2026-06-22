"use client";

import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GiftRegistryCTA() {
    return (
        <section className="py-24 bg-[var(--pk-cream)] relative overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[2.5rem] shadow-xl border border-[var(--pk-stone)] text-center relative overflow-hidden"
                >
                    {/* Decorative Background Icon */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-[var(--pk-gold)]/5 pointer-events-none">
                        <Gift size={300} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <span className="text-[var(--pk-gold)] uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
                            Presentes
                        </span>

                        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[var(--pk-charcoal)] mb-6">
                            Lista de Casamento
                        </h2>

                        <p className="font-[family-name:var(--font-lato)] text-[var(--pk-text-muted)] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                            Sua presença é nosso maior presente. Mas se desejar nos presentear, preparamos uma lista especial com muito carinho.
                        </p>

                        <Link href="/gifts" className="inline-block group">
                            <span className="inline-flex items-center gap-3 bg-[var(--pk-gold)] text-white px-10 py-5 rounded-xl hover:bg-[var(--pk-gold-dim)] transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold shadow-lg hover:shadow-[var(--pk-gold)]/30 hover:-translate-y-1">
                                Ver Lista de Presentes
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
