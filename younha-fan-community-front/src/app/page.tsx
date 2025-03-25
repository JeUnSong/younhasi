import MainIllustration from '@/components/MainIllustration';
import BottomNav from '@/components/BottomNav';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <main className="flex-1 max-w-6xl mx-auto px-10 w-full py-5">
                {/* 상단 영역 */}
                <div className="h-[500px] relative flex items-center justify-center overflow-hidden text-white">
                    {/* 메인 일러스트 */}
                    <MainIllustration />
                </div>
                {/* 하단 네비 */}
                <BottomNav />
            </main>
        </div>
    );
}