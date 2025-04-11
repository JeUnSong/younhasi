"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { FaFacebookF, FaInstagram, FaTwitter, FaWeibo, FaYoutube, FaTh } from "react-icons/fa";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 5);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={classNames(
                "fixed top-0 left-0 right-0 z-30 px-6 py-4 flex justify-between items-center transition-all duration-300",
                scrolled
                    ? "bg-[var(--color-bg)] backdrop-blur-md shadow-md text-black"
                    : "bg-transparent text-white"
            )}
        >
            {/* 로고 */}
            <div className="text-lg font-bold tracking-wide">
                <Link href="/">YOUNHASI</Link>
            </div>


            {/* 중앙 메뉴 */}
            <nav className="hidden md:flex gap-8 text-sm font-semibold">
                <Link href="/" className="hover:underline">HOME</Link>
                <Link href="#" className="hover:underline">공지사항</Link>
                <Link href="#" className="hover:underline">자유게시판</Link>
                <Link href="#" className="hover:underline">갤러리</Link>
            </nav>

            {/* 우측 SNS 아이콘 */}
            <div className="flex gap-4 text-lg">
                <a href="https://www.instagram.com/younha_holic/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://x.com/younhaholic" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://www.youtube.com/c/younhaofficial" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                </a>
                <FaTh />
            </div>
        </header>
    );
}