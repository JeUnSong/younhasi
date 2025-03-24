"use client";
import { useYtuner } from "./useYtuner";
import { useState, useEffect } from "react";

export default function YTunerPanel() {
    const { isOpen } = useYtuner();
    const [theme, setTheme] = useState<"growth" | "end">("growth");

    useEffect(() => {
        document.documentElement.classList.remove("growth-theme", "end-theme");
        document.documentElement.classList.add(`${theme}-theme`);
    }, [theme]);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-40 transform transition-transform duration-300 p-4
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <h2 className="text-lg font-bold mb-4">
                Y-TUNER
                <span className="block text-xs text-gray-500 font-normal mt-1">
          윤하가 너를 조율해줄게
        </span>
            </h2>

            <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">테마 선택</h4>
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
        </div>
    );
}