"use client";

import { useEffect } from "react";
import SubContent from "@/components/subContent";

export default function Home() {
    useEffect(() => {
        document.documentElement.classList.add("growth-theme");
        return () => {
            document.documentElement.classList.remove("growth-theme");
        };
    }, []);

    return (
        <div className="relative z-0">

            {/* 메인 Hero 영역 (fixed로 고정) */}
            <div className="fixed top-0 left-0 right-0 h-screen overflow-hidden -z-10">
                <img
                    src="/dummy/maxresdefault.jpg"
                    className="w-full h-full object-cover"
                    alt="hero background"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 히어로 텍스트 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center text-white">
                <h1 className="text-5xl font-bold mb-6 tracking-widest font-logo text-accent drop-shadow-md">
                    YOUNHA FANPAGE
                </h1>
                <p className="text-lg mb-10 font-title text-[var(--color-text-secondary)]">
                    Welcome to the world of Younha ✨
                </p>
            </div>

            {/* 서브 콘텐츠 (예: 최신 콘텐츠 섹션) */}
            <SubContent />
        </div>
    );
}