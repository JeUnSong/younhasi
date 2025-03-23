"use client";

import Image from "next/image";
import { useState } from "react";

const twitterFeed = [
    {
        user: "YOUNHA",
        name: "@younhaholic",
        date: "Mar 5",
        content: "「GROWTH THEORY FINAL EDITION」  OUT NOW💿",
        image: "/dummy/tweet1.jpg",
    },
];

const youtubeVideoId = "3nrOpwpQMSg"; // IU 'Shopper' MV

export default function HomeSections() {
    const noticeList = [
        "🔸 첫 번째 공지글 (2025.02.26)",
        "🔸 두 번째 공지글 (2025.01.06)",
        "🔸 세 번째 공지글 (2024.08.09)",
        "🔸 네 번째 공지글 (2024.08.08)",
        "🔸 다섯 번째 공지글 (2024.08.07)",
        "🔸 여섯 번째 공지글 (2024.08.07)",
        "🔸 일곱 번째 공지글 (2024.08.07)",
        "🔸 여덟 번째 공지글 (2024.08.07)",
        "🔸 아홉 번째 공지글 (2024.08.07)",
        "🔸 열 번째 공지글 (2024.08.07)",
        "🔸 열하나 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
        "🔸 열두 번째 공지글 (2024.08.07)",
    ];

    const renderList = (items: string[]) =>
        items.slice(0, 11).map((item, idx) => <li key={idx}>{item}</li>);

    const [playVideo, setPlayVideo] = useState(false);

    const imageList = Array.from({ length: 6 }, (_, i) => `/dummy/insta/ins${i + 1}.png`);

    const renderInstagramList = (images: string[]) => (
        <ul className="grid grid-cols-3 grid-rows-3 gap-2">
            {images.slice(0, 6).map((src, idx) => (
                <li
                    key={idx}
                    className={idx === 0 ? "col-span-2 row-span-2" : ""}
                >
                    <div className="w-full aspect-square relative rounded-md overflow-hidden">
                        <Image
                            src={src}
                            alt={`insta-${idx}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </li>
            ))}
        </ul>
    );

    const renderTwitterFeed = () => (
        <div className="space-y-4">
            {twitterFeed.map((tweet, idx) => (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 space-y-2 text-sm"
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

    const renderYoutube = () => (
        <div className="w-full h-full relative">
            {playVideo ? (
                <iframe
                    className="absolute inset-0 w-full h-full rounded-md"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            ) : (
                <div
                    onClick={() => setPlayVideo(true)}
                    className="absolute inset-0 w-full h-full cursor-pointer rounded-md overflow-hidden"
                >
                    <Image
                        src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`}
                        alt="Youtube thumbnail"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white text-4xl bg-black/30">
                        ▶
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-4 gap-1 mb-10 py-5 text-[13px] leading-relaxed">
                {/* NOTICE */}
                <div className="p-3 flex flex-col">
                    <h2 className="font-title text-accent text-base border-b pb-1 mb-2">
                        NOTICE
                    </h2>
                    <ul className="flex-1 overflow-auto">{renderList(noticeList)}</ul>
                </div>

                {/* TWITTER */}
                <div className="p-3 flex flex-col">
                    <h2 className="font-title text-accent text-base border-b pb-1 mb-2">
                        TWITTER
                    </h2>
                    <div className="flex-1 overflow-hidden">{renderTwitterFeed()}</div>
                </div>

                {/* INSTAGRAM */}
                <div className="p-3 flex flex-col">
                    <h2 className="font-title text-accent text-base border-b pb-1 mb-2">
                        INSTAGRAM
                    </h2>
                    {renderInstagramList(imageList)}
                </div>

                {/* YOUTUBE */}
                <div className="p-3 flex flex-col">
                    <h2 className="font-title text-accent text-base border-b pb-1 mb-2">
                        YOUTUBE
                    </h2>
                    <div className="flex-1 relative w-full aspect-video">{renderYoutube()}</div>
                </div>
        </div>
    );
}