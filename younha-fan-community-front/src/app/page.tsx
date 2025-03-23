import MainIllustration from '@/components/MainIllustration';
import BottomNav from '@/components/BottomNav';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <main className="flex-1 max-w-6xl mx-auto px-10 w-full py-5">
                {/* 상단 영역 */}
                <div className="h-[500px] relative flex items-center justify-center overflow-hidden text-white">
                    {/* 배경 별 */}
                    <div className="absolute inset-0 bg-[url('/star-DpvJGKxE.png')] bg-cover opacity-20 animate-starFloat" />
                    {/* 메인 일러스트 */}
                    <MainIllustration />
                    {/* 하단 그라데이션 블러 */}
                    <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t z-0" />
                </div>

                {/* 하단 네비 */}
                <BottomNav />
            </main>
        </div>
    );
}