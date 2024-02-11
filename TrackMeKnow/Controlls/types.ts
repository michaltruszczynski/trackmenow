export type TControls = {
    updateFieldsValue : (position: TPosition) => void;
    setButtonOnStartEvent:(onStartClickCB: TCallback) => void;
    setButtonOnStopEvent: (onStopClickCB: TCallback) => void;
    setResetButtonEvent: (onResetClick: TCallback) => void;
    resetStartStopButton: () => void;
}

export type TPosition = {
    latitude: number,
    longitude: number,
    date: Date;
}

export type TCallback = () => void