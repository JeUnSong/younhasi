import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="growth-theme">
            <body>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}