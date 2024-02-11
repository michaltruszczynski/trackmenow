import PageHTMLElement from "../../../../PageHTMLElement";

export type TButtonOnClickCB = () => void;

export interface IResetButtonElement {
    button: PageHTMLElement<'input'>;
    onClickCB?: TButtonOnClickCB;
    addOnClickCB: (cb: TButtonOnClickCB) => void;
}