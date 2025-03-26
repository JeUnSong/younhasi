"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const twitterFeed = [
    {
        user: "YOUNHA",
        name: "@younhaholic",
        date: "Mar 5",
        content: "「GROWTH THEORY FINAL EDITION」  OUT NOW💿",
        image: "/dummy/tweet1.jpg",
    },
];

type InstagramPost = {
    title: string;
    imageUrl: string;
    postUrl: string;
};

export default function HomeSections() {
    const [videoId, setVideoId] = useState<string | null>(null);

    useEffect(() => {
        const fetchYoutubeVideo = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/youtube/latest`);
                const data = await res.json();
                const item = data.items?.[0];

                if (item?.id?.videoId) {
                    setVideoId(item.id.videoId);
                }
            } catch (err) {
                console.error("유튜브 영상 불러오기 실패:", err);
            }
        };

        fetchYoutubeVideo();
    }, []);

    const noticeList = [
        "첫 번째 공지글 (25.02.23)",
        "두 번째 공지글 (25.01.06)",
        "세 번째 공지글 (24.08.09)",
        "네 번째 공지글 (24.08.08)",
        "다섯 번째 공지글 (24.08.07)",
        "여섯 번째 공지글 (24.08.07)",
        "일곱 번째 공지글 (24.08.07)",
        "여덟 번째 공지글 (24.08.07)",
        "아홉 번째 공지글 (24.08.07)",
        "열 번째 공지글 (24.08.07)",
        "열하나 번째 공지글 (24.08.07)",
        "열두 번째 공지글 (24.08.07)",
    ];

    const renderList = (items: string[]) =>
        items.slice(0, 10).map((item, idx) => {
            const match = item.match(/^(.*)\s+\((.*)\)$/);
            const title = match?.[1] ?? item;
            const date = match?.[2] ?? '';

            return (
                <li
                    key={idx}
                    className="flex justify-between items-center text-sm text-text-main mb-1"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-[13px]">{title}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{date}</span>
                </li>
            );
        });

    const InstagramGrid = () => {
        const [posts, setPosts] = useState<InstagramPost[]>([]);

        useEffect(() => {
            fetch("http://localhost:8080/api/instagram/latest")
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(err => console.error("❌ 인스타 데이터 불러오기 실패", err));
        }, []);

        const renderInstagramList = (posts: InstagramPost[]) => (
            <ul className="grid grid-cols-3 grid-rows-3 gap-2">
                {posts.slice(0, 6).map((post, idx) => (
                    <li key={idx} className={idx === 0 ? "col-span-2 row-span-2" : ""}>
                        <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                            <div className="w-full aspect-square relative overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title || `insta-${idx}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        );

        return <>{renderInstagramList(posts)}</>;
    };

    const renderTwitterFeed = () => (
        <div className="space-y-4">
            {twitterFeed.map((tweet, idx) => (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 shadow-sm p-4 space-y-2 text-sm"
                >
                    <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                        <span>@{tweet.user} • {tweet.date}</span>
                        <span className="text-gray-400">{tweet.name}</span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-line">{tweet.content}</p>
                    {tweet.image && (
                        <div className="rounded-md overflow-hidden mt-2">
                            <Image
                                src={tweet.image}
                                alt=""
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover rounded-md"
                                priority
                                loading="eager"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderYoutube = () => {
        if (!videoId) return <div>로딩 중...</div>;

        return (
            <div className="w-full aspect-square relative overflow-hidden">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    className="w-full h-full"
                    title="YouTube video"
                    allow="encrypted-media"
                    allowFullScreen
                />
            </div>
        );
    };

    return (
        <div className="grid grid-cols-4 gap-1 mb-10 text-[13px] leading-relaxed">
            {/* NOTICE */}
            <div className="p-3 flex flex-col">
                <h2 className="font-titletext-sm font-semibold tracking-wide text-accent border-b border-accent pb-1 mb-2">
                    NOTICE
                </h2>
                <div className="flex-1 overflow-auto">{renderList(noticeList)}</div>
            </div>

            {/* TWITTER */}
            <div className="p-3 flex flex-col">
                <h2 className="font-titletext-sm font-semibold tracking-wide text-accent border-b border-accent pb-1 mb-2">
                    TWITTER
                </h2>
                <div className="flex-1 overflow-hidden">{renderTwitterFeed()}</div>
            </div>

            {/* INSTAGRAM */}
            <div className="p-3 flex flex-col">
                <a href="https://www.instagram.com/younha_holic/" className="font-titletext-sm font-semibold tracking-wide text-accent border-b border-accent pb-1 mb-2" target='_blank'>
                    INSTAGRAM
                </a>
                <InstagramGrid />
            </div>

            {/* YOUTUBE */}
            <div className="p-3 flex flex-col">
                <h2 className="font-titletext-sm font-semibold tracking-wide text-accent border-b border-accent pb-1 mb-2">
                    YOUTUBE
                </h2>
                {renderYoutube()}
            </div>
        </div>
    );
}
