"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, Stars } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            router.push("/admin/dashboard");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao fazer login";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--pk-gold)] opacity-[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--pk-gold)] opacity-[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-[var(--pk-stone)] shadow-[0_30px_100px_-20px_rgba(30,38,29,0.08)]">
                    <div className="text-center mb-10">
                        <div className="inline-block p-4 rounded-full bg-[var(--pk-stone)] text-[var(--pk-gold)] mb-6">
                            <Stars size={32} />
                        </div>
                        <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-[#1E261D] mb-2 uppercase tracking-tight">Admin</h1>
                        <p className="text-[var(--pk-text-muted)] text-sm tracking-widest uppercase font-bold">Gustavo & Jéssica</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] text-[var(--pk-gold)]">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--pk-stone)]" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-[var(--pk-stone)] py-3 pl-8 focus:border-[var(--pk-gold)] outline-none text-lg text-[#1E261D] transition-colors"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] text-[var(--pk-gold)]">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--pk-stone)]" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent border-b border-[var(--pk-stone)] py-3 pl-8 focus:border-[var(--pk-gold)] outline-none text-lg text-[#1E261D] transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1E261D] text-white py-4 rounded-xl font-bold tracking-[0.4em] text-xs hover:bg-[var(--pk-gold)] hover:shadow-xl transition-all duration-500 disabled:opacity-50 flex justify-center items-center gap-3"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : "ENTRAR NO DASHBOARD"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-[var(--pk-text-muted)] text-xs uppercase tracking-[0.2em]">
                    Criado por Capybara Holding
                </p>
            </motion.div>
        </div>
    );
}
