"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 5); // 10px 이상 스크롤 시 효과 발동
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={classNames(
                "fixed top-0 left-0 right-0 z-20 px-6 py-4 flex justify-between items-center  text-sm font-medium transition-all duration-300",
                scrolled
                    ? "bg-[var(--color-bg)] backdrop-blur-md shadow-md text-black"
                    : "bg-transparent text-white"
            )}
        >
            <div className="text-lg font-bold tracking-wide">
                <Link href="/">YOUNHASI</Link>
            </div>
            <nav className="space-x-6">
                <Link href="/" className="hover:underline">HOME</Link>
                <Link href="#" className="hover:underline">공지사항</Link>
                <Link href="#" className="hover:underline">자유게시판</Link>
                <Link href="#" className="hover:underline">DISCOGRAPHY</Link>
            </nav>
        </header>
    );
}