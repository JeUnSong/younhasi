"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

interface Props {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    menuItems: { label: string; href: string }[];
    scrolled: boolean;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}

export default function MobileMenu({
                                       isOpen,
                                       menuItems,
                                       scrolled,
                                       hoveredIndex,
                                       setHoveredIndex,
                                   }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={classNames(
                        "block md:hidden fixed top-[60px] left-0 right-0 z-50 overflow-hidden transition-colors duration-300",
                        "border-t",
                        isOpen &&
                        (scrolled
                            ? "bg-[var(--color-bg)] border-neutral-200 text-black"
                            : "bg-transparent border-white/30 text-white")
                    )}
                >
                    <div className="p-4 space-y-3 text-sm font-semibold">
                        {menuItems.map((item, index) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={classNames(
                                    "block transition-colors duration-200",
                                    hoveredIndex === null
                                        ? scrolled
                                            ? "text-black"
                                            : "text-white"
                                        : hoveredIndex === index
                                            ? scrolled
                                                ? "text-black"
                                                : "text-white"
                                            : "text-gray-400"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
