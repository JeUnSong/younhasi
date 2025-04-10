import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YTunerToggle from "@/components/ytuner/YTunerToggle";
import YTunerPanel from "@/components/ytuner/YTunerPanel";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="growth-theme">
            <body>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />

                {/*<YTunerPanel />
                <YTunerToggle />*/}
            </body>
        </html>
    );
}