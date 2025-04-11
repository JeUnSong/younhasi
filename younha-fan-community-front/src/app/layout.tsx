import "@/app/globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import YTuner from "@/components/ytuner/YTuner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="growth-theme">
            <body>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <YTuner />
            </body>
        </html>
    );
}