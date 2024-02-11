import PageHTMLElement from "../../../../PageHTMLElement";
import { ButtonStatus, IButtonElement, TButtonOnClickCB } from "./types";

class StartStopButtonElement implements IButtonElement{
    button: PageHTMLElement<'input'>;
    private buttonText: string;
    private state: ButtonStatus;
    onStartClickCB?: TButtonOnClickCB;
    onStopClickCB?: TButtonOnClickCB;

    constructor(buttonText: string) {
        this.button = new PageHTMLElement('input', {
            ui: {
                classList: ['button', 'button--green']
            },
            type: 'button',
        });
        this.buttonText = buttonText;
        this.state = ButtonStatus.Start;
        this.initialize()
    }

    private initialize() {
        this.changeButtonText(this.buttonText);
        this.addOnClickListiner()
    }

    private changeButtonText(buttonText: string) {
        this.button.addAttribute('value', buttonText)
    }

    private onClickEvent() {
        const isStartButtonClicked = this.state === ButtonStatus.Start;

        if (isStartButtonClicked) {
            console.log('Start')
            this.onStartClick();
            this.state = ButtonStatus.Stop
        } else {
            console.log('Stop')
            this.onStopClick()
            this.state = ButtonStatus.Start
        }
    }

    private addOnClickListiner() {
        this.button.addOnClickEventListiner(this.onClickEvent.bind(this))
    }

    private onStartClick() {
        this.changeToStopButton();
        const {onStartClickCB} = this;
        const isOnStopClickCBDefined = onStartClickCB !== undefined
        if (isOnStopClickCBDefined) {
            onStartClickCB()
        }
    }

    private onStopClick() {
        this.changeToStartButton()
        const {onStopClickCB} = this;
        const isOnStopClickCBDefined = onStopClickCB !== undefined
        if (isOnStopClickCBDefined) {
            onStopClickCB()
        }
    }

    resetButton() {
        this.changeToStartButton()
        this.state = ButtonStatus.Start
    }

    private changeToStopButton() {
        this.button.removeClassName('button--green');
        this.button.addClassName('button--red');
        this.changeButtonText('Stop');

    }

    private changeToStartButton() {
        this.button.removeClassName('button--red');
        this.button.addClassName('button--green');
        this.changeButtonText('Start');
    }

    addOnStartCB(cb: TButtonOnClickCB) {
        this.onStartClickCB = cb
    }

    addOnStopCB(cb: TButtonOnClickCB) {
        this.onStopClickCB = cb
    }

    disableButton() {
        this.button.setDisabledAttribute()
    }

    enableButton() {
        this.button.removeDisabledAttribute()
    }

}

export default StartStopButtonElement;

const red = "FF6969"
const green = "6A9C89"
const grey = "EAEAEA"
const dgray = "B2B2B2"
const bgray = "3C4048"

