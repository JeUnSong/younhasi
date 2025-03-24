import Link from "next/link";

export default function Header() {
    return (
        <header
            className="
                        w-full
                        bg-[var(--color-header-bg)]
                        border-b
                        py-1
                        border-[var(--color-card-border)]
                      "
        >
            <div
                className="
                          max-w-6xl
                          mx-auto
                          px-6
                          py-3
                          flex
                          items-center
                          justify-between
                        "
            >
                <h1 className="font-logo text-xl font-bold tracking-wider text-white">
                    <Link href="/">YOUNHASI</Link>
                </h1>

                <div className="flex items-center gap-6">
                    <nav className="flex gap-6">
                        {["공지사항", "TO YOUNHA", "자유게시판", "최신쇼츠486"].map((menu, i) => (
                            <button
                                key={i}
                                className="
                                          font-nav
                                          text-white
                                          text-sm
                                          font-medium
                                          tracking-wide
                                          hover:text-white/80
                                          transition
                                        "
                            >
                                {menu}
                            </button>
                        ))}
                    </nav>

                    {/* 로그인 버튼 */}
                    <button className="ml-4 text-white text-sm font-semibold hover:text-white/80 transition">
                        로그인
                    </button>
                </div>
            </div>
        </header>
    );
}