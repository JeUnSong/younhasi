"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMusicStar } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";

const tabs = [
    { id: "player", label: "🎧 감정선 플레이어" },
    { id: "theme", label: "🎨 테마 바꾸기" },
    { id: "star", label: "🌟 윤하의 별밤" },
];

export default function YTuner() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("player");

    const changeTheme = (theme: string) => {
        // 기존 테마 클래스 제거
        const root = document.documentElement;
        root.classList.remove("growth-theme", "end-theme");
        root.classList.add(theme);
    };

    const fabMotion = isOpen
        ? {
            top: "25%",
            left: "67.5%",
            bottom: "auto",
            right: "auto",
            x: "-50%",
            y: "-50%",
            scale: 1.5,
        }
        : {
            top: "auto",
            left: "auto",
            bottom: "24px",
            right: "24px",
            x: "0%",
            y: "0%",
            scale: 1,
        };

    return (
        <>
            {/* 오버레이 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* 튜너 버튼 */}
            <motion.div
                className="fab-wrapper"
                animate={fabMotion}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                <button className="fab-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={20} /> : <TbMusicStar size={20} />}
                </button>
                <span className="fab-ripple"></span>
            </motion.div>

                {/* 튜너 UI */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed top-1/4 left-1/3 -translate-x-1/2 mt-4
                             bg-white text-black p-6 rounded-2xl shadow-xl
                              w-[34%] max-w-[80%] text-center z-50"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <h2 className="text-xl font-bold mb-2">🎵 Y튜너</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                감정에 맞는 테마와 음악을 추천해드릴게요!
                            </p>

                            {/* 탭 버튼 */}
                            <div className="flex justify-center gap-2 mb-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-2 rounded-full text-sm transition font-medium
                      ${
                                            activeTab === tab.id
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* 탭 콘텐츠 */}
                            <div>
                                {activeTab === "player" && (
                                    <div>🎶 감정 기반 음악 플레이어 기능</div>
                                )}
                                {activeTab === "theme" && (
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className="mb-2 text-sm text-gray-600">원하는 테마를 선택하세요:</p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => changeTheme("growth-theme")}
                                                className="px-4 py-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 text-sm font-medium"
                                            >
                                                GROWTH THEORY
                                            </button>
                                            <button
                                                onClick={() => changeTheme("end-theme")}
                                                className="px-4 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-medium"
                                            >
                                                END THEORY
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "star" && (
                                    <div>🌌 윤하의 별이 빛나는 밤 테마 모드</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

        </>
    );
}