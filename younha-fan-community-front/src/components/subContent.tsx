"use client";

import { useEffect, useState } from "react";

export default function SubContent() {
    const [videos, setVideos] = useState<any[]>([]);
    const [shorts, setShorts] = useState<any[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const latestRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/youtube/latest`);
                const shortsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/youtube/shorts`);

                const latestData = await latestRes.json();
                const shortsData = await shortsRes.json();

                setVideos(latestData.slice(0, 3));
                setShorts(shortsData.slice(0, 6));
            } catch (err) {
                console.error("❌ 유튜브 영상 불러오기 실패:", err);
            }
        };

        fetchVideos();
    }, []);

    const renderCards = (data: any[], type: "video" | "short") => {
        return data.map((video, idx) => {
            const videoId = video.id;
            const { title, thumbnails } = video.snippet;

            return (
                <a
                    key={idx}
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition ${
                        type === "short" ? "" : "block"
                    }`}
                >
                    <div className={type === "short" ? "w-full aspect-[9/16] bg-black" : "w-full h-48"}>
                        <img
                            src={thumbnails.high.url}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className={`p-3 ${type === "short" ? "text-sm" : "p-4"}`}>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                            {type === "short" ? "" : "유튜브"}
                        </p>
                        <h3 className={`font-semibold leading-tight ${type === "short" ? "text-sm line-clamp-2" : "text-base"}`}>
                            {title}
                        </h3>
                    </div>
                </a>
            );
        });
    };

    return (
        <section className="relative z-10 w-full bg-[var(--color-bg)] py-20">
            {/* 최신 콘텐츠 */}
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <h2 className="text-3xl font-bold mb-8 border-b-4 inline-block border-accent pb-1 font-title">
                    최신 소식
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {videos.length === 0 ? (
                        <div className="col-span-3 text-center text-sm text-gray-400">
                            유튜브 영상을 불러오는 중입니다...
                        </div>
                    ) : (
                        renderCards(videos, "video")
                    )}
                </div>
            </div>

            {/* 최신숏츠 486 */}
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 border-b-4 inline-block border-accent pb-1 font-title">
                    최신숏츠 486
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {shorts.length === 0 ? (
                        <div className="col-span-full text-center text-sm text-gray-400">
                            Shorts 콘텐츠를 불러오는 중입니다...
                        </div>
                    ) : (
                        renderCards(shorts, "short")
                    )}
                </div>
            </div>
        </section>
    );
}
