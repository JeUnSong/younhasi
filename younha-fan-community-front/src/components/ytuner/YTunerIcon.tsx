import { ArrowRight, Wand2 } from "lucide-react";

interface Props {
    isOpen: boolean;
}

export default function YTunerIcon({ isOpen }: Props) {
    return isOpen ? <ArrowRight className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />;
}