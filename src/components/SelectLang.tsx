import { ChangeEventHandler } from "react";
import type { ILang } from "../types";

interface IProps {
    defaultLang: ILang;
    onChangeFunction: ChangeEventHandler<HTMLSelectElement>;
}

interface ILanguageOption {
    language: ILang;
    label: string;
}

const languageOptions: ILanguageOption[] = [
    { language: "ar", label: "Arabic" },
    { language: "br", label: "Belarusian" },
    { language: "zh", label: "Chinese" },
    { language: "nl", label: "Dutch" },
    { language: "en", label: "English (British)" },
    { language: "us", label: "English (American)" },
    { language: "fr", label: "French" },
    { language: "de", label: "German" },
    { language: "hi", label: "Hindi" },
    { language: "it", label: "Italian" },
    { language: "ja", label: "Japanese" },
    { language: "ko", label: "Korean" },
    { language: "pl", label: "Polish" },
    { language: "pt", label: "Portuguese" },
    { language: "ru", label: "Russian" },
    { language: "es", label: "Spanish" },
    { language: "tr", label: "Turkish" },
    { language: "uk", label: "Ukrainian" }
];

export default function SelectLang({ defaultLang, onChangeFunction }: IProps) {
    return (
        <select value={defaultLang} onChange={onChangeFunction}>
            {languageOptions.map(({ language, label }: ILanguageOption) => (
                <option key={language} value={language}>
                    {label}
                </option>
            ))}
        </select>
    );
}
