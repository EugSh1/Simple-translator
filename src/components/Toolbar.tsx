import { ArrowRightLeft, Clipboard, Volume2, X } from "lucide-react";

interface IProps {
    onSwapLanguages: () => void;
    onCopyTranslation: () => void;
    onSpeakTranslation: () => void;
    onClearText: () => void;
}

export default function Toolbar({ onSwapLanguages, onCopyTranslation, onSpeakTranslation, onClearText }: IProps) {
    return (
        <div className="toolbar">
            <button title="Reverse translation" onClick={onSwapLanguages}>
                <ArrowRightLeft />
            </button>
            <button title="Copy translation" onClick={onCopyTranslation}>
                <Clipboard />
            </button>
            <button title="Listen translation" onClick={onSpeakTranslation}>
                <Volume2 />
            </button>
            <button title="Clear source text" onClick={onClearText}>
                <X />
            </button>
        </div>
    );
}
