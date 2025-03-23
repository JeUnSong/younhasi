import Image from 'next/image';

export default function MainIllustration() {
    return (
        <div className="relative text-center">
            <Image
                src="/dummy/younha-stage.png"
                alt="Younha Stage"
                width={300}
                height={300}
                className="mx-auto rounded-lg hover:scale-105 transition-transform"
            />
        </div>
    );
}