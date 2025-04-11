"use client";

import YoutubeContent from "@/components/youtubeContent";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Home() {
    return (
        <div className="relative z-0">
            {/* 메인 Hero 영역 */}
            <div className="fixed top-0 left-0 right-0 w-full h-screen md:h-[100vh] overflow-hidden -z-10">
                <div
                    className="hidden md:block w-full h-full object-cover object-center"
                    style={{ backgroundImage: "var(--hero-bg-desktop)", backgroundSize: "cover", backgroundPosition: "center" }}
                />
                <div
                    className="block md:hidden w-full h-full object-cover object-top"
                    style={{ backgroundImage: "var(--hero-bg-mobile)", backgroundSize: "cover", backgroundPosition: "top" }}
                />
                <div className="absolute inset-0 bg-black/30" />
                {/*차 후 제거 할지도 모름*/}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10" />
            </div>

            {/* 히어로 텍스트 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center text-white">
                {/* 좌측 중앙 소셜 링크 */}
                <div className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-8 text-white">
                    <a
                        href="https://www.instagram.com/younha_holic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 text-xl transform transition-transform duration-200 hover:-translate-y-1"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://x.com/younhaholic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 text-xl transform transition-transform duration-200 hover:-translate-y-1"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://www.youtube.com/c/younhaofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500 text-xl transform transition-transform duration-200 hover:-translate-y-1"
                    >
                        <FaYoutube />
                    </a>
                    <div className="w-px h-24 bg-white/40 my-2"></div>
                    <span className="text-xs tracking-widest rotate-180 writing-vertical text-white/60">
                        YOUNHA
                    </span>
                </div>
            </div>

            {/* 서브 콘텐츠 */}
            <YoutubeContent />
        </div>
    );
}

