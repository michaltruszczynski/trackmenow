import PageHTMLElement from "../../../PageHTMLElement";

class MessageField {
    errorField: PageHTMLElement<'p'>
    constructor() {
        this.errorField = new PageHTMLElement('p', {
            ui: {
                className: 'message'
            }
        })
    }

    showErrorMessage(text: string) {
        this.errorField.htmlElement.innerText = text;
    }

    deleteErrorMessage() {
        this.errorField.htmlElement.innerText = '';
    }

    getHtmlElment() {
        return this.errorField.htmlElement;
    }
}

export default MessageField;