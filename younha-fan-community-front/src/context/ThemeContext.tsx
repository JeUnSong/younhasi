"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const ThemeContext = createContext({
    theme: "ocean",
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState("ocean");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "ocean" ? "space" : "ocean"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div
                className={`min-h-screen transition-all duration-300 ${
                    theme === "ocean" ? "bg-oceanBackground" : "bg-spaceBackground"
                } text-white`}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}