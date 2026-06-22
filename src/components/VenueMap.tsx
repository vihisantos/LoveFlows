"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const VENUE = {
    name: "Local do Evento",
    address: "Endereço do Local",
    city: "Cidade, Estado",
    coordinates: {
        lat: -23.5505,
        lng: -46.6333
    }
};

export default function VenueMap() {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${VENUE.coordinates.lat},${VENUE.coordinates.lng}`;
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.${VENUE.coordinates.lat}!2d${VENUE.coordinates.lng}!3d${VENUE.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ2JzEwLjYiTiAxMcKwMjEnMzEuNyJF!5e0!3m2!1sen!2sbr!4v1234567890123!5m2!1sen!2sbr`;

    return (
        <section className="py-32 bg-[var(--pk-cream)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--pk-cream)] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[var(--pk-gold)]/30 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-[var(--pk-gold)] mb-4 uppercase tracking-[0.3em] text-sm font-bold"
                    >
                        <MapPin size={16} />
                        <span>Localização</span>
                    </motion.div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-[var(--pk-charcoal)] mb-6">
                        Como Chegar
                    </h2>
                    <p className="font-[family-name:var(--font-lato)] text-[var(--pk-text-muted)] max-w-2xl mx-auto text-lg leading-relaxed">
                        Encontre-nos neste local mágico. Clique no mapa para abrir no GPS do seu dispositivo.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-[var(--pk-stone)] h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-16 h-16 bg-[var(--pk-gold)]/10 rounded-2xl flex items-center justify-center mb-6">
                                        <MapPin size={32} className="text-[var(--pk-gold)]" />
                                    </div>
                                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--pk-charcoal)] mb-4">
                                        {VENUE.name}
                                    </h3>
                                    <p className="text-[var(--pk-text-muted)] mb-2 leading-relaxed">
                                        {VENUE.address}
                                    </p>
                                    <p className="text-[var(--pk-gold)] font-bold mb-6">
                                        {VENUE.city}
                                    </p>
                                    <div className="h-px bg-[var(--pk-stone)] my-6" />
                                    <p className="text-sm text-[var(--pk-text-muted)] mb-2">
                                        <strong>Data:</strong> 01 de Janeiro de 2027
                                    </p>
                                    <p className="text-sm text-[var(--pk-text-muted)]">
                                        <strong>Horário:</strong> 17:00
                                    </p>
                                </div>

                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 w-full bg-[var(--pk-gold)] text-white py-4 px-6 rounded-xl hover:bg-[var(--pk-gold-dim)] transition-all duration-500 uppercase tracking-[0.3em] text-xs font-bold flex items-center justify-center gap-3 group shadow-xl hover:shadow-[var(--pk-gold)]/30"
                                >
                                    <Navigation size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                    <span>Abrir no GPS</span>
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="relative w-full h-[400px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-white">
                                <iframe
                                    src={embedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localização do Casamento"
                                    className="absolute inset-0"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[var(--pk-gold)]/30 to-transparent" />
        </section>
    );
}
