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
                <a href="https://www.instagram.com/younha_holic/" className="hover:underline" target="_blank">Instagram</a>
                <a className="hover:underline">|</a>
                <a href="https://www.youtube.com/@YOUNHAOFFICIAL" className="hover:underline" target="_blank">YouTube</a>
                <a className="hover:underline">|</a>
                <a href="https://x.com/younhaholic" className="hover:underline" target="_blank">Twitter</a>
            </div>
        </footer>
    );
}