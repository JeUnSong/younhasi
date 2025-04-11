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

            {/* 메인 Hero 영역*/}
            <div className="fixed top-0 left-0 right-0 w-full h-screen md:h-[100vh] overflow-hidden -z-10">
                {/* 데스크탑/태블릿용 */}
                <img
                    src="/dummy/bg-desktop.jpg"
                    alt="background"
                    className="hidden md:block w-full h-full object-cover object-center"
                />

                {/* 모바일용 */}
                <img
                    src="/dummy/bg-mobile.jpg"
                    alt="mobile background"
                    className="block md:hidden w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 히어로 텍스트 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center text-white">

            </div>

            {/* 서브 콘텐츠*/}
            <SubContent />
        </div>
    );
}