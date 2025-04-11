export default function Footer() {
    return (
        <footer
            className="
                        relative
                        z-20
                        w-full
                        py-7
                        text-center
                        bg-[var(--color-footer-bg)]
                        text-[var(--color-text-secondary)]
                        border-t
                        border-[var(--color-card-border)]
                        leading-relaxed
                      "
        >
            <div className="text-[14px] mb-2">
                © 2025 YOUNHASI | Made with love at 4:29<span className="text-accent text-[13px] align-middle ml-1">♥</span>
            </div>
            <div className="space-x-4 text-[11px] text-neutral-400">
                <a href="#" className="hover:underline">이용약관</a>
                <a href="#" className="hover:underline">개인정보처리방침</a>
            </div>
        </footer>
    );
}