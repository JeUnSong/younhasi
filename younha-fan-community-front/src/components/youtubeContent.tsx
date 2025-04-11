"use client";

import { useEffect, useState } from "react";

export default function YoutubeContent() {
    const [videos, setVideos] = useState<any[]>([]);
    const [shorts, setShorts] = useState<any[]>([]);
    const [playingIds, setPlayingIds] = useState<string[]>([]);

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
            const { id, title, thumbnail } = video;
            const isPlaying = playingIds.includes(id);

            const handlePlay = () => {
                setPlayingIds((prev) => [...prev, id]);
            };

            return (
                <div
                    key={idx}
                    className={`bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition ${
                        type === "short" ? "" : "block"
                    }`}
                >
                    <div className={type === "short" ? "w-full aspect-[9/16] bg-black" : "w-full h-48"}>
                        {isPlaying ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="relative w-full h-full cursor-pointer" onClick={handlePlay}>
                                <img
                                    src={thumbnail}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-14 h-14 text-white opacity-90"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`p-3 ${type === "short" ? "text-sm" : "p-4"}`}>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                            {type === "short" ? "" : "유튜브"}
                        </p>
                        <h3 className={`font-semibold leading-tight ${type === "short" ? "text-sm line-clamp-2" : "text-base"}`}>
                            <a
                                href={`https://www.youtube.com/watch?v=${id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {title}
                            </a>
                        </h3>
                    </div>
                </div>
            );
        });
    };

    return (
        <section className="relative z-10 w-full bg-[var(--color-bg)] py-20">
            {/* 최신 콘텐츠 */}
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <h2 className="text-3xl font-bold mb-8 border-b-2 inline-block border-accent pb-1 font-title">
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
                <h2 className="text-3xl font-bold mb-8 border-b-2 inline-block border-accent pb-1 font-title">
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
