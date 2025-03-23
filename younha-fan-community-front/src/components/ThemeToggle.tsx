"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <button
                onClick={toggleTheme}
                className="mt-4 p-2 bg-white text-black rounded"
            >
                테마 변경
            </button>
            <p className="mt-2 text-sm">현재 테마: {theme}</p>
        </>
    );
}