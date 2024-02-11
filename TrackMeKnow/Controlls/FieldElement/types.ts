import PageHTMLElement from "../../../../PageHTMLElement";

export type TFieldElement = {
    setFieldText: (text: string) => void;
    removeFieldText: () => void;
    getFieldElement: () => PageHTMLElement<'div'>
}