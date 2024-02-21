import PageHTMLElement from "../../PageHTMLElement";
import Geolocation from "./Geolocation";
import GoogleMap from "./GoogleMap";
import Controls from "./Controlls";
import ErrorMessageField from "./ErrorMsgField";
import { isDomContentLoadedCheck, isWindowCheck, detectIfMobile } from "../../utility";

import MarkerController from "./MarkerController/index";
import { TPosition, TTrackMe } from "./types";

class TrackMe implements TTrackMe {
    private appContainer: HTMLElement;
    private googleMapContainer: PageHTMLElement<'div'>;
    private errorMessageField: ErrorMessageField;

    private controls: Controls;
    private geolocation: Geolocation;
    private googleMap?: google.maps.Map;
    private markerController?: MarkerController
    private position?: {
        lat: number,
        lng: number
    };
    private isMobileDeviceAndGeolocationApiAvailable: boolean;

    constructor(appContainer: HTMLElement) {
        isWindowCheck();
        isDomContentLoadedCheck();
        this.appContainer = appContainer;
        this.googleMapContainer = new PageHTMLElement('div', { ui: { className: 'map-container' } });
        this.errorMessageField = new ErrorMessageField();
        
        this.controls = new Controls();
        this.geolocation = new Geolocation();

        this.isMobileDeviceAndGeolocationApiAvailable = true;
    }

    async startApp() {
        try {
            this.checkAppEnviromentRequirements();
            if (!this.isMobileDeviceAndGeolocationApiAvailable) return;

            this.initializeAppUIComponents();

            await this.initializeMap();
            await this.initializePositionMarker()
            this.intializeControls()
            this.initializeGeolocationCB();
            await this.initializeWatchGeolocationAPIPermision()
            this.geolocation.startWatching();

            // throw Error('qwe')

        } catch (error) {
            const isErrorInstanceOfError = error instanceof Error;
            if (isErrorInstanceOfError) {
                const { message } = error;
                this.errorMessageField.showErrorMessage(message);
            }
        }
    }

    private checkAppEnviromentRequirements() {
        try {
            // detectIfMobile();
            this.geolocation.isGeolocationAPISupported();
        } catch (error) {
            this.isMobileDeviceAndGeolocationApiAvailable = false;
            const isErrorInstanceOfError = error instanceof Error;
            if (isErrorInstanceOfError) {
                const { message } = error
                this.showAppErrorMessage(message);
                return;
            }
            console.log(error);
            this.showAppErrorMessage('Application can not start. See console for details.');
        }
    }

    private onNewPosition(position: TPosition) {
        this.controls.updateFieldsValue(position);
        const { latitude, longitude } = position;

        const currentPosition = {
            lat: latitude,
            lng: longitude
        }

        this.position = currentPosition

        const { googleMap, markerController } = this;
        const isGoogleMapDefined = googleMap !== undefined;
        const isMarkerControllerDefined = markerController !== undefined;

        if (isGoogleMapDefined) {
            googleMap.panTo(currentPosition);
        }
        if (isMarkerControllerDefined) {
            markerController.setCurrentPositionMarkerPosition(currentPosition)
        }
    }



    private async initializeMap() {
        try {
            const googleMap = await GoogleMap.getInstance(this.googleMapContainer.htmlElement);
            this.googleMap = googleMap;
        } catch (error) {
            console.log(error);
            const errorMessage = 'Unable to load GoogleMap';
            console.log(errorMessage, error);
            this.errorMessageField.showErrorMessage(errorMessage);
        }
    }

    private async initializePositionMarker() {
        try {
            const { googleMap } = this;
            const isGoogleMapDefined = googleMap !== undefined;
            if (!isGoogleMapDefined) {
                const errorMessage = 'Can not initialize MarkerController without GooglMap'
                throw new Error(errorMessage)
            }
            this.markerController = await MarkerController.getInstance(googleMap)
        } catch (error) {
            const isErrorInstance = error instanceof Error;
            if (isErrorInstance) {
                const { message } = error;
                this.errorMessageField.showErrorMessage(message);
            }
            const errorMessage = 'Can not initialize MarkerController.'
            this.errorMessageField.showErrorMessage(errorMessage);
        }
    }

    private async initializeWatchGeolocationAPIPermision() {
        await this.geolocation.watchGeolocationAPIPermission()
    }

    private async intializeControls() {
        this.controls.setButtonOnStartEvent(this.startTracking.bind(this));
        this.controls.setButtonOnStopEvent(this.stopTracking.bind(this));
        this.controls.setResetButtonEvent(this.resetTracking.bind(this));
    }

    private initializeAppUIComponents() {
        this.appContainer.append(this.googleMapContainer.htmlElement);
        this.appContainer.append(this.errorMessageField.getHtmlElment());
        this.appContainer.append(this.controls.controlsElement.htmlElement);
    }

    private initializeGeolocationCB() {
        this.geolocation.addOnNewPositionCb(this.onNewPosition.bind(this));
        this.geolocation.addOnErrorCb(this.errorMessageField.showErrorMessage.bind(this.errorMessageField))
    }

    private showAppErrorMessage(errorMessage: string) {
        this.appContainer.append(this.errorMessageField.getHtmlElment());
        this.errorMessageField.showErrorMessage(errorMessage);
    }

    private startTracking() {
    const { markerController, position } = this;
    const isMarkerControllerDefined = markerController !== undefined;
    const isPositionDefined = position !== undefined;
    const isEligibleToStartTracking = isMarkerControllerDefined && isPositionDefined
    if (isEligibleToStartTracking) {
        markerController.removeStartMarker();
        markerController.removeStopMarker();
        markerController.createStartTrackingMarker(position)
    }
}

private stopTracking() {
    const { markerController, position } = this;
    const isMarkerControllerDefined = markerController !== undefined;
    const isPositionDefined = position !== undefined;
    const isEligibleToStopTracking = isMarkerControllerDefined && isPositionDefined
    if (isEligibleToStopTracking) {
        markerController.createStopTrackingMarker(position);
    }
}

private resetTracking() {
    const { markerController, } = this;
    const isMarkerControllerDefined = markerController !== undefined;
    if (!isMarkerControllerDefined) return;
    markerController.removeStartMarker();
    markerController.removeStopMarker();
    this.controls.resetStartStopButton();
}
}

export default TrackMe;

