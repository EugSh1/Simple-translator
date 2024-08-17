import { useEffect, useState } from "react";
import SelectLang from "./components/SelectLang.tsx";
import { translateText } from "./translate.ts";
import { ArrowRightLeft, Clipboard, Volume2, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

export default function App() {
    const [text, setText] = useState<string>("");
    const [fromLang, setFromLang] = useState<string>("en");
    const [toLang, setToLang] = useState<string>("de");
    const [translationResult, setTranslationResult] = useState<string>("");

    useEffect(() => {
        if (text.trim() === "") {
            setTranslationResult("");
            return;
        }

        async function updateTranslationResult() {
            setTranslationResult(await translateText(text, fromLang, toLang));
        }
        updateTranslationResult();
    }, [text, fromLang, toLang]);

    function swapLanguages(): void {
        const translationResultOld = translationResult;
        setTranslationResult(text);
        setText(translationResultOld);
        const fromLangOld = fromLang;
        setFromLang(toLang);
        setToLang(fromLangOld);
    }

    function copyTranslation(): void {
        navigator.clipboard.writeText(translationResult);
        alert("Translation copied");
    }

    function speakTranslation(): void {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(translationResult);
            utterance.lang = toLang;
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Your browser does not support Web Speech API.");
        }
    }

    function clearText(): void {
        setText("");
        setTranslationResult("");
    }

    return (
        <>
            <div className="main-container">
                <div className="toolbar">
                    <button title="Reverse translation" onClick={swapLanguages}>
                        <ArrowRightLeft />
                    </button>
                    <button title="Copy translation" onClick={copyTranslation}>
                        <Clipboard />
                    </button>
                    <button
                        title="Listen translation"
                        onClick={speakTranslation}
                    >
                        <Volume2 />
                    </button>
                    <button title="Clear source text" onClick={clearText}>
                        <X />
                    </button>
                </div>
                <div className="row-container">
                    <div className="column-container">
                        <SelectLang
                            defaultLang={fromLang}
                            onChangeFunction={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) => setFromLang(event.target.value)}
                        />
                        <TextareaAutosize
                            minRows={3}
                            maxRows={10}
                            value={text}
                            placeholder="Enter text"
                            onChange={(
                                event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setText(event.target.value)}
                        ></TextareaAutosize>
                    </div>

                    <div className="column-container">
                        <SelectLang
                            defaultLang={toLang}
                            onChangeFunction={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) => setToLang(event.target.value)}
                        />
                        <TextareaAutosize
                            minRows={3}
                            maxRows={10}
                            value={translationResult}
                            placeholder="Translation"
                            readOnly
                        ></TextareaAutosize>
                    </div>
                </div>
            </div>
        </>
    );
}
