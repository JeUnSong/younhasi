import Link from "next/link";

export default function Header() {
    return (
        <header
            className="
                w-full
                bg-[var(--color-header-bg)]
                border-b
                border-[var(--color-card-border)]
            "
        >
            {/*
                컨테이너 역할:
                - 최대 폭: 너가 원하는 사이즈 (예: max-w-screen-lg, max-w-6xl 등)
                - mx-auto로 중앙 정렬
                - px-6 등 패딩은 넣어서 양옆 공백 확보
            */}
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
                <h1 className="font-title text-2xl text-white">
                    <Link href="/">YOUNHASI</Link>
                </h1>

                <nav className="flex gap-4">
                    {['공지사항', 'TO YOUNHA', '자유게시판', '최신쇼츠486'].map((menu, i) => (
                        <button
                            key={i}
                            className="
                                font-nav
                                text-white
                                font-normal
                                hover:text-white/80
                                transition
                              "
                        >
                            {menu}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
}