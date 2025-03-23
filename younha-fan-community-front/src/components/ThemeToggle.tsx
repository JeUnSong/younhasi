"use client";
import { useState, useEffect } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"growth" | "end">("growth");
    const [open, setOpen] = useState(false); // 설정창 열고 닫기

    // 테마가 바뀔 때마다 documentElement 클래스 갱신
    useEffect(() => {
        document.documentElement.classList.remove("growth-theme", "end-theme");
        document.documentElement.classList.add(`${theme}-theme`);
    }, [theme]);

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="
                        fixed bottom-20 right-4
                        bg-accent text-white
                        px-4 py-2 rounded-full
                        shadow hover:shadow-md
                        transition
                        z-50
                        flex items-center gap-2
                      "
                >
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    <span>설정</span>
                </button>
            )}

            {open && (
                <div
                    className="
                        fixed bottom-0 left-0 w-full
                        bg-white
                        border-t border-[var(--color-card-border)]
                        p-4 shadow-md
                        z-50
                        text-[var(--color-text-main)]
                      "
                >
                    {/* 상단 영역: 닫기버튼 */}
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold">테마 선택</h4>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-[var(--color-text-secondary)] hover:text-red-500 transition"
                        >
                            닫기 ✕
                        </button>
                    </div>

                    {/* 테마 선택 버튼들 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setTheme("growth")}
                            className="
                                px-3 py-1
                                rounded-full
                                text-sm font-medium
                                bg-[#7cb3e4] text-white
                                hover:bg-[#2c6ca0]
                                transition
                              "
                        >
                            GROWTH THEORY
                        </button>
                        <button
                            onClick={() => setTheme("end")}
                            className="
                                px-3 py-1
                                rounded-full
                                text-sm font-medium
                                bg-[#e88898] text-white
                                hover:bg-[#b54e5e]
                                transition
                              "
                        >
                            END THEORY
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}