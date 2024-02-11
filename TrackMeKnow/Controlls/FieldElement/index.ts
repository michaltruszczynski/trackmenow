import PageHTMLElement from "../../../../PageHTMLElement";
import { TFieldElement } from "./types";

class FieldElement implements TFieldElement {
    private label: string;
    private fieldElement: PageHTMLElement<'div'>;
    private fieldText: PageHTMLElement<'p'>;
    private fieldLabel: PageHTMLElement<'p'>;
    private defaultText?: string

    constructor(label: string, defaultText?: string) {
        this.label = label;
        this.fieldElement = new PageHTMLElement('div', {
            ui: {
                className: 'field'
            }
        });

        this.fieldLabel = new PageHTMLElement('p', {
            ui: {
                className: 'field__label',
                text: 'Location: '
            }
        });

        this.fieldText = new PageHTMLElement('p', {
            ui: {
                className: 'field__text'
            }
        });

        const isDefaultTextDefined = defaultText !== undefined;
        if (isDefaultTextDefined) {
            this.defaultText = defaultText;
        }

        this.initialize()
    }

    private initialize() {
        const {defaultText} = this
        const isDefaultTextDefined = defaultText !== undefined;
        if (isDefaultTextDefined) {
            this.setFieldText(defaultText)
        }
        this.setLabelText(this.label);
        this.fieldElement.appendPageHtmlElement(this.fieldLabel);
        this.fieldElement.appendPageHtmlElement(this.fieldText);
    }

    setFieldText(text: string) {
        this.fieldText.htmlElement.innerText = text;
    }

    removeFieldText() {
        this.fieldText.htmlElement.innerText = '';
    }

    private setLabelText(text: string) {
        this.fieldLabel.htmlElement.innerText = this.label;
    }

    getFieldElement() {
        return this.fieldElement;
    }

}

export default FieldElement;