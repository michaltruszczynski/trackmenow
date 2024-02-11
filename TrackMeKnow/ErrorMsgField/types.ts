import PageHTMLElement from "../../../PageHTMLElement"

export type TErrorMessageField = {
    errorField: PageHTMLElement<'p'>;
    showErrorMessage: (text: string) => void
    deleteErrorMessage: () => void;
    getHtmlElment: () => void;
}