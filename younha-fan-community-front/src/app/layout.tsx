import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AudioPlayerToggle from "@/components/AudioPlayerToggle";
import ThemeToggle from "@/components/ThemeToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="growth-theme">
            <body>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <AudioPlayerToggle />
                <ThemeToggle />
            </body>
        </html>
    );
}