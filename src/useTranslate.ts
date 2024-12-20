import { useEffect, useState } from "react";
import { Lang } from "./types";

export default function useTranslate() {
    const [sourceText, setSourceText] = useState<string>("");
    const [translatedText, setTranslatedText] = useState<string>("");
    const [sourceLang, setSourceLang] = useState<Lang>("en");
    const [targetLang, setTargetLang] = useState<Lang>("de");

    useEffect(() => {
        if (sourceText.trim() === "") {
            setTranslatedText("");
            return;
        }

        async function updateTranslationResult() {
            await translate();
        }
        updateTranslationResult();
    }, [sourceText, sourceLang, targetLang]);

    async function translate(): Promise<void> {
        try {
            const response = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${sourceLang}&tl=${targetLang}&q=${sourceText}`
            );
            const result: any = await response.json();

            if (!result) {
                throw new Error("Invalid translation result");
            }

            const translatedText = result[0]
                .map((item: any) => item[0])
                .join(" ")
                .replace(/\s{2,}/g, " ");

            setTranslatedText(translatedText);
        } catch (error) {
            throw new Error(`Translation error: ${(error as Error).message}`);
        }
    }

    function swapLanguages(): void {
        setSourceLang((prev) => {
            setTargetLang(prev);
            return targetLang;
        });
        setSourceText((prev) => {
            setTranslatedText(prev);
            return translatedText;
        });
    }

    function copyTranslation(): void {
        navigator.clipboard.writeText(translatedText);
        alert("Translation copied");
    }

    function speakTranslation(): void {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(translatedText);
            utterance.lang = targetLang;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Your browser does not support Web Speech API.");
        }
    }

    function clearText(): void {
        setSourceText("");
        setTranslatedText("");
    }

    return {
        sourceText,
        translatedText,
        sourceLang,
        targetLang,
        setSourceText,
        setSourceLang,
        setTargetLang,
        swapLanguages,
        copyTranslation,
        speakTranslation,
        clearText
    } as const;
}
