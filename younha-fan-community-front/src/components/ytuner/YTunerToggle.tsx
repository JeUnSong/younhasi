"use client";
import { useYtuner } from "./useYtuner";
import { ArrowRight, Wand2 } from "lucide-react";

export default function YTunerToggle() {
    const { isOpen, toggle } = useYtuner();

    return (
        <button
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-md hover:scale-105 transition"
            aria-label="Y-Tuner"
        >
            {isOpen ? <ArrowRight className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
        </button>
    );
}