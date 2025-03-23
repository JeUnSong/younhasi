"use client";

import { useState } from "react";
import { PlayIcon, PauseIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function AudioPlayerToggle() {
    const [open, setOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="
                                fixed bottom-6 right-6 z-50
                                flex items-center gap-2 px-4 py-2
                                rounded-full text-sm font-nav
                                shadow-md bg-accent text-white
                                hover:bg-accent-dark transition
                              "
                >
                    🎵 오디오 열기
                </button>
            )}

            {open && (
                <div
                    className="
                                fixed
                                bottom-0
                                left-0
                                w-full
                                bg-white
                                border-t
                                border-[var(--color-card-border)]
                                flex
                                items-center
                                justify-between
                                p-4
                                shadow-md
                                z-50
                              "
                >
                    {/* 재생/일시정지 */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 text-[var(--color-text-main)] hover:text-accent transition"
                    >
                        {isPlaying ? (
                            <>
                                <PauseIcon className="w-5 h-5" />
                                <span>일시정지</span>
                            </>
                        ) : (
                            <>
                                <PlayIcon className="w-5 h-5" />
                                <span>재생</span>
                            </>
                        )}
                    </button>

                    {/* 중앙: 오디오 */}
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                            Now Playing
                        </h4>
                        <audio
                            controls
                            autoPlay={isPlaying}
                            className="mt-1"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src="/younha-snippet.mp3" type="audio/mpeg" />
                            브라우저가 오디오를 지원하지 않아요 😢
                        </audio>
                    </div>

                    {/* 오른쪽: 닫기 */}
                    <button
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-red-500 transition"
                    >
                        <XMarkIcon className="w-5 h-5" />
                        <span>닫기</span>
                    </button>
                </div>
            )}
        </>
    );
}