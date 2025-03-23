"use client";

import Layout from "@/components/Layout";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
    return (
        <Layout>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-2">Welcome to YOUNHA Fan Site</h1>
                <p className="mb-4">현재 테마: 7집 (END THEORY)</p>
                <ThemeToggle />
            </div>
        </Layout>
    );
}