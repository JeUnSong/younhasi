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
                console.log("📺 API 요청 중...", process.env.NEXT_PUBLIC_API_URL);
                setVideos(latestData.slice(0, 3));
                setShorts(shortsData.slice(0, 3));
            } catch (err) {
                console.error("❌ 유튜브 영상 불러오기 실패:", err);
            }
        };

        fetchVideos();
    }, []);

    const renderVideoCards = (data: any[]) => {
        return data.map((video, idx) => {
            const videoId = video.id; // ← 수정된 부분!
            const { title, thumbnails } = video.snippet;

            return (
                <a
                    key={idx}
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded shadow hover:shadow-md transition overflow-hidden block"
                >
                    <img
                        src={thumbnails.high.url}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                            유튜브
                        </p>
                        <h3 className="text-base font-semibold">{title}</h3>
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
                        renderVideoCards(videos)
                    )}
                </div>
            </div>

            {/* 최신쇼츠 486 — 유지 요청한 형태! */}
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 border-b-4 inline-block border-accent pb-1 font-title">
                    최신쇼츠 486
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {shorts.length === 0 ? (
                        <div className="col-span-3 text-center text-sm text-gray-400">
                            쇼츠 영상을 불러오는 중입니다...
                        </div>
                    ) : (
                        renderVideoCards(shorts)
                    )}
                </div>
            </div>
        </section>
    );
}
