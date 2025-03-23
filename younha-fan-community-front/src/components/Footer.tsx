export default function Footer() {
    return (
        <footer
            className="
                w-full
                py-6
                text-center
                bg-[var(--color-footer-bg)]
                text-[var(--color-text-secondary)]
                border-t
                border-[var(--color-card-border)]
            "
        >
            <p className="text-sm font-title text-[var(--color-accent)] mb-1">
                YOUNHA COMMUNITY
            </p>
            <p className="text-xs">
                © 2025, 함께 성장하는 팬 커뮤니티
            </p>
        </footer>
    );
}