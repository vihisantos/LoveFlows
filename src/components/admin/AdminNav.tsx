"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { LogOut, Users, MessageSquare, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AdminNav() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--pk-stone)]">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-[family-name:var(--font-playfair)] text-xl text-[#1E261D] tracking-tight font-bold">
                        G & J | ADMIN
                    </span>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#1E261D] hover:text-[var(--pk-gold)] transition-colors">
                            <LayoutDashboard size={16} />
                            DASHBOARD
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-bold tracking-widest text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                    >
                        <LogOut size={16} />
                        SAIR
                    </button>
                </div>
            </div>
        </nav>
    );
}
