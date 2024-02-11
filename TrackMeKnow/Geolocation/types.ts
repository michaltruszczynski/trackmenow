export type TPosition = {
    latitude: number,
    longitude: number,
    date: Date;
}

export type TOnNewPositionCB = (position: TPosition) => void;
export type TOnErrorCb = (mesage: string) => void;

export type TGeolocation = {
    position?: TPosition;
    startWatching: () => void;
    stopWatching: () => void;
    addOnNewPositionCb: (onNewPositionCB: TOnNewPositionCB) => void;
    addOnErrorCb: (onErrorCb: TOnErrorCb) => void
    checkGeolocationAPIPermision: () => void;
    watchGeolocationAPIPermission: () => void;
    isGeolocationAPISupported: () => void;
    checkIfGeolocationAllowed: () => void;
    getCurrentPosition: () => TPosition | undefined
}