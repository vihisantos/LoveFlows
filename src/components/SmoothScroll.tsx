"use client";

import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });


        // eslint-disable-next-line
        setLenis(lenisInstance);

        let rafId: number;

        function raf(time: number) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
            cancelAnimationFrame(rafId);
            setLenis(null);
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
}
