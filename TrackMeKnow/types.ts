export type TPosition = {
    latitude: number,
    longitude: number,
    date: Date;
}

export type TTrackMe = {
    startApp: () => Promise<void>
}