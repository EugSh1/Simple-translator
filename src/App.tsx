import SelectLang from "./components/SelectLang.tsx";
import { Lang } from "./types.ts";
import useTranslate from "./useTranslate.ts";
import TextareaAutosize from "react-textarea-autosize";
import Toolbar from "./components/Toolbar.tsx";

export default function App() {
    const {
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
    } = useTranslate();

    return (
        <div className="main-container">
            <Toolbar
                onSwapLanguages={swapLanguages}
                onCopyTranslation={copyTranslation}
                onSpeakTranslation={speakTranslation}
                onClearText={clearText}
            />
            <div className="row-container">
                <div className="column-container">
                    <SelectLang
                        defaultLang={sourceLang}
                        onChangeFunction={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            setSourceLang(event.target.value as Lang)
                        }
                    />
                    <TextareaAutosize
                        minRows={3}
                        maxRows={10}
                        value={sourceText}
                        placeholder="Enter text"
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setSourceText(event.target.value)}
                    ></TextareaAutosize>
                </div>

                <div className="column-container">
                    <SelectLang
                        defaultLang={targetLang}
                        onChangeFunction={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            setTargetLang(event.target.value as Lang)
                        }
                    />
                    <TextareaAutosize
                        minRows={3}
                        maxRows={10}
                        value={translatedText}
                        placeholder="Translation"
                        readOnly
                    ></TextareaAutosize>
                </div>
            </div>
        </div>
    );
}
