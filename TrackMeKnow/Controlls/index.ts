import PageHTMLElement from "../../../PageHTMLElement";
import StartStopButtonElement from "./StartStopButtonElement";
import ResetButtonElement from "./ResetButtonElement";
import FieldElement from "./FieldElement";
import { TPosition, TControls, TCallback } from "./types";

class Controls implements TControls {
    controlsElement: PageHTMLElement<'div'>;
    private buttonsContainer: PageHTMLElement<'div'>;
    private startStopGeolocationBtn: StartStopButtonElement;
    private resetButtonElement: ResetButtonElement;
    private locationFieldsContainer: PageHTMLElement<'div'>;
    private locationDateField: FieldElement
    private latitudeField: FieldElement;
    private longitudeField: FieldElement;


    constructor() {
        this.controlsElement = new PageHTMLElement('div', {
            ui: {
                className: 'controls'
            }
        });
        this.buttonsContainer = new PageHTMLElement('div', {
            ui: {
                className: 'button-container'
            }
        });
        this.startStopGeolocationBtn = new StartStopButtonElement('Start');
        this.resetButtonElement = new ResetButtonElement('Reset');
        this.locationFieldsContainer = new PageHTMLElement('div', {
            ui: {
                className: 'fields-container'
            }
        });
        this.locationDateField = new FieldElement('Date:');
        this.latitudeField = new FieldElement('Latitude:');
        this.longitudeField = new FieldElement('Longitude:');
        this.initialize()
    }

    private initialize() {
        this.initializeButtons()
        this.initializeLocationFields()
    }

    updateFieldsValue(position: TPosition) {
        const { date, latitude, longitude } = position
        this.locationDateField.setFieldText(date.toString());
        this.latitudeField.setFieldText(latitude.toString());
        this.longitudeField.setFieldText(longitude.toString());
    }
    setButtonOnStartEvent(onStartClickCB: TCallback) {
        this.startStopGeolocationBtn.addOnStartCB(onStartClickCB)
    }

    setButtonOnStopEvent(onStopClickCB: TCallback) {
        this.startStopGeolocationBtn.addOnStopCB(onStopClickCB)
    }

    setResetButtonEvent(onResetClick: TCallback) {
        this.resetButtonElement.addOnClickCB(onResetClick)
    }

    resetStartStopButton() {
        this.startStopGeolocationBtn.resetButton()
    }

    private initializeButtons() {
        this.buttonsContainer.appendPageHtmlElement(this.startStopGeolocationBtn.button)
        this.buttonsContainer.appendPageHtmlElement(this.resetButtonElement.button)
        this.controlsElement.appendPageHtmlElement(this.buttonsContainer)

    }

    private initializeLocationFields() {
        this.locationFieldsContainer.appendPageHtmlElement(this.locationDateField.getFieldElement());
        this.locationFieldsContainer.appendPageHtmlElement(this.latitudeField.getFieldElement())
        this.locationFieldsContainer.appendPageHtmlElement(this.longitudeField.getFieldElement())
        this.controlsElement.appendPageHtmlElement(this.locationFieldsContainer);
    }
}

export default Controls;