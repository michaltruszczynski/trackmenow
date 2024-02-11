import { TGeolocation, TOnErrorCb, TOnNewPositionCB, TPosition } from "./types";

class Geolocation implements TGeolocation {
    private watchId: number | null;
    private onNewPositionCB?: TOnNewPositionCB;
    private onErrorCB?: TOnErrorCb;
    position?: TPosition;
    
    constructor() {
        this.watchId = null;
    }

    startWatching() {
        this.isGeolocationAPISupported()
        const watchId = navigator.geolocation.watchPosition(this.onSuccess.bind(this), this.onError.bind(this))
        this.watchId = watchId;
    }

    stopWatching() {
        this.isGeolocationAPISupported();
        const { watchId } = this;
        const isWatchIdDefined = watchId !== null;
        if (!isWatchIdDefined) return;
        navigator.geolocation.clearWatch(watchId);
        this.watchId = null;
    }

    addOnNewPositionCb(onNewPositionCB: TOnNewPositionCB) {
        this.onNewPositionCB = onNewPositionCB;
    }

    addOnErrorCb(onErrorCb: TOnErrorCb) {
        this.onErrorCB = onErrorCb;
    }

    private onSuccess(position: GeolocationPosition) {
        const { coords, timestamp } = position;
        const { latitude, longitude } = coords
        const date = new Date(timestamp)
        const currentPosition = {
            latitude,
            longitude

        }
        const positionData = {
            ...currentPosition,
            date
        }

        const { onNewPositionCB, onErrorCB } = this
        const isOnNewPositionCBDefined = onNewPositionCB !== undefined;
        const isOnErrorCBDefined = onErrorCB !== undefined;
        if (isOnNewPositionCBDefined) {
            onNewPositionCB(positionData)
        }

        if (isOnErrorCBDefined) {
            onErrorCB('')
        }
    }

    private onError(error: GeolocationPositionError) {
        const isErrorInstanceOfGeolocationPositionError = error instanceof GeolocationPositionError;
        console.log(error)
        console.log(this.watchId)
        const { onErrorCB } = this
        const isOnErrorCBDefined = onErrorCB !== undefined;
        if (isErrorInstanceOfGeolocationPositionError) {
            const { message } = error;
            if (isOnErrorCBDefined) {
                onErrorCB(message)
            }
        }
    }

    async checkGeolocationAPIPermision() {
        try {
            const permisionStatus = (await navigator.permissions.query({ name: "geolocation" })).state;
            const isPermissionGranted = permisionStatus === "granted";
            if (!isPermissionGranted) {
                const errorMessage = 'Geolocation not allowed. Please enable geolocation in your browser settings.'
                throw new Error(errorMessage)
            }
        } catch (error) {
            const isErrorInstanceOfTypeError = error instanceof TypeError;
            const isErrorInstanceOfError = error instanceof Error;
            if (isErrorInstanceOfTypeError && isErrorInstanceOfError) {
                const errorMessage = 'Geolocation API not suppoted by the browser.'
                throw new Error(errorMessage);
            }
            if (isErrorInstanceOfError) {
                const { message } = error;
                throw new Error(message)
            }
        }
    }

    async watchGeolocationAPIPermission() {
        try {
            const geolocationPermission = (await navigator.permissions.query({ name: "geolocation" }))
            geolocationPermission.onchange = (event) => {
                console.log(event)
                const isGeolocationAllowed = geolocationPermission.state === 'granted'
                if (isGeolocationAllowed) {
                    console.log(navigator.geolocation)
                    if (!this.watchId) {
                        this.startWatching();
                    }
                } else {
                    this.stopWatching();
                    const errorMessage = 'Geolocation disabled. Please enable geolocation in your browser settings.'
                    const { onErrorCB } = this
                    const isOnErrorCBDefined = onErrorCB !== undefined;
                    if (isOnErrorCBDefined) {
                        onErrorCB(errorMessage)
                    }
                }
            }
        } catch (error) {
            const errorMessage = 'Geolocation API not suppoted by the browser.'
            throw new Error(errorMessage);
        }
    }

    isGeolocationAPISupported() {
        const isGeolocationAPISupported = "geolocation" in navigator;

        if (!isGeolocationAPISupported) {
            const errorMessage = 'Geolocation API not supported by the browser. Unable to proceed.'
            throw new Error(errorMessage);
        }
    }

    async checkIfGeolocationAllowed() {
        try {
            const geolocationPermission = (await navigator.permissions.query({ name: "geolocation" }))
            const { state } = geolocationPermission;
            const isPermissionGranted = state === 'granted'
            if (isPermissionGranted) return;
            const errorMessage = 'Geolocation API not suppoted by the browser.'
            throw new Error(errorMessage);
        } catch (error) {
            const isErrorInstance = error instanceof Error;
            if (isErrorInstance) {
                const { message } = error;
                throw new Error(message);
            }
            console.log(error)
        }
    }

    getCurrentPosition() {
        return this.position;
    }
}
export default Geolocation;