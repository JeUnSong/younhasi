"use client";

import { motion,  } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import MobileMenu from "./MobileMenu";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 5);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInsideSlide = target.closest("#desktop-slide");
            const isHamburger = hamburgerRef.current?.contains(target);
            if (window.innerWidth >= 768 && !isInsideSlide && !isHamburger) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    const menuItems = [
        { label: "공지사항", href: "#" },
        { label: "자유게시판", href: "#" },
        { label: "갤러리", href: "#" },
        { label: "로그인", href: "#" },
    ];

    return (
        <>
            <header
                className={classNames(
                    "fixed top-0 left-0 right-0 z-30 flex justify-between items-center transition-all duration-300",
                    "h-[82px] pt-0 pb-0 pl-5 pr-5 md:pl-[100px] md:pr-[100px]",
                    scrolled
                        ? "bg-[var(--color-header-bg)] backdrop-blur-md shadow-md text-black"
                        : "bg-transparent text-white"
                )}
            >
                <div className="text-2xl font-bold tracking-wide">
                    <Link href="/">YOUNHASI</Link>
                </div>

                {/* 중앙 메뉴 (데스크탑 전용) */}
                <nav className="hidden md:flex gap-10 text-1xl font-semibold">
                    {menuItems.map((item, index) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={classNames(
                                "transition-colors duration-200",
                                hoveredIndex === null
                                    ? scrolled ? "text-black" : "text-white"
                                    : hoveredIndex === index
                                        ? scrolled ? "text-black" : "text-white"
                                        : "text-gray-400"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex gap-4 text-1xl">
                    <button
                        ref={hamburgerRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden" // 모바일만 햄버거
                    >
                        <motion.div
                            key={isOpen ? "close" : "open"}
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </motion.div>
                    </button>

                </div>
            </header>

            {/* 메뉴 */}
            <MobileMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                menuItems={menuItems}
                scrolled={scrolled}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />
        </>
    );
}
