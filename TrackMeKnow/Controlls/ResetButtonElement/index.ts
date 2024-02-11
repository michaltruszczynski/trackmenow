import PageHTMLElement from "../../../../PageHTMLElement";
import { IResetButtonElement, TButtonOnClickCB } from "./types";

class ResetButtonElement implements IResetButtonElement {
    button: PageHTMLElement<'input'>;
    private buttonText: string;
    onClickCB?: TButtonOnClickCB;
    
    constructor(buttonText: string) {
        this.button = new PageHTMLElement('input', {
            ui: {
                classList: ['button', 'button--grey']
            },
            type: 'button',
        });
        this.buttonText = buttonText;
        this.initialize()
    }

    private initialize() {
        this.setButtonText(this.buttonText);
    }

    private setButtonText(buttonText: string) {
        this.button.addAttribute('value', buttonText)
    }

    addOnClickCB(cb: TButtonOnClickCB) {
        this.onClickCB = cb;
        this.button.addOnClickEventListiner(cb.bind(this))
    }
}

export default ResetButtonElement;
