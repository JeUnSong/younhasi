"use client";

import { ReactNode, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Layout({ children }: { children: ReactNode }) {
    const { theme } = useTheme();

    useEffect(() => {
        console.log("현재 테마:", theme);
    }, [theme]);

    return (
        <div className="min-h-screen text-white">
            <header className="p-4 bg-oceanPrimary text-center">
                YOUNHA 팬사이트
            </header>
            <main className="container mx-auto p-4">{children}</main>
            <footer className="p-4 text-center bg-oceanPrimary">
                © 2025 YOUNHA Fan Site
            </footer>
        </div>
    );
}