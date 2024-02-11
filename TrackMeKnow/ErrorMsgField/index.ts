import PageHTMLElement from "../../../PageHTMLElement";
import { TErrorMessageField } from "./types";

class ErrorMessageField implements TErrorMessageField {
    errorField: PageHTMLElement<'p'>
    constructor() {
        this.errorField = new PageHTMLElement('p', {
            ui: {
                className: 'error-message'
            }
        })
    }

    showErrorMessage(text: string) {
        this.errorField.htmlElement.innerText = text
    }

    deleteErrorMessage() {
        this.errorField.htmlElement.innerText = ''
    }
    getHtmlElment() {
        return this.errorField.htmlElement;
    }
}

export default ErrorMessageField;