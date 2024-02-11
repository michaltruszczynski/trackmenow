import PageHTMLElement from "../../../../PageHTMLElement";

export type TButtonOnClickCB = () => void;

export enum ButtonStatus {
    Start,
    Stop
}

export interface IButtonElement {
    button: PageHTMLElement<'input'>;
    onStartClickCB?: TButtonOnClickCB;
    onStopClickCB?: TButtonOnClickCB;
    addOnStartCB: (cb: TButtonOnClickCB) => void;
    addOnStopCB: (cb: TButtonOnClickCB) => void;
    disableButton: () => void;
    enableButton: () => void;
}