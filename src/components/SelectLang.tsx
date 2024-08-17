import { ChangeEventHandler } from "react";

interface SelectLangProps {
    defaultLang: string;
    onChangeFunction: ChangeEventHandler<HTMLSelectElement>;
}

export default function SelectLang({ defaultLang, onChangeFunction }: SelectLangProps) {
    return (
        <select value={defaultLang} onChange={onChangeFunction}>
            <option value="ar">Arabic</option>
            <option value="br">Belarusian</option>
            <option value="zh">Chinese</option>
            <option value="nl">Dutch</option>
            <option value="en">English (British)</option>
            <option value="us">English (American)</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
            <option value="uk">Ukrainian</option>
        </select>
    );
}
