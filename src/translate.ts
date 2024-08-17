export async function translateText(text: string, from: string, to: string): Promise<string> {
    try {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${from}&tl=${to}&q=${text}`
        );
        const result: any = await response.json();

        if (!result) {
            throw new Error("Invalid translation result");
        }

        const translatedText = result[0]
            .map((item: any) => item[0])
            .join(" ")
            .replace(/\s{2,}/g, " ");
        return translatedText;
    } catch (error) {
        throw new Error(`Translation error: ${(error as Error).message}`);
    }
}