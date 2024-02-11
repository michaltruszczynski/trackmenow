import loader from "../GoogleMapLoader";
import { MARKER_BLUE, MARKER_GREEN, MARKER_RED } from "./markerColors";

type TPosition = google.maps.LatLng


class MarkerController {
    private static instance: MarkerController
    private AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
    private PinElement: typeof google.maps.marker.PinElement;
    currentPositionMarker: google.maps.marker.AdvancedMarkerElement | null;
    startTrackingPositionMarker: google.maps.marker.AdvancedMarkerElement | null;
    stopTrackingPositionMarker: google.maps.marker.AdvancedMarkerElement | null;
    map: google.maps.Map;

    private constructor(AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement, PinElement: typeof google.maps.marker.PinElement, map: google.maps.Map) {
        this.AdvancedMarkerElement = AdvancedMarkerElement;
        this.PinElement = PinElement;
        this.map = map;
        this.currentPositionMarker = this.createMarker(MARKER_BLUE, this.map);
        this.startTrackingPositionMarker = null;
        this.stopTrackingPositionMarker = null;
    }

    static async getInstance(map: google.maps.Map) {
        const { instance } = MarkerController;
        const isMarkerControllerDefined = instance !== undefined
        if (isMarkerControllerDefined) {
            return instance
        }

        try {
            const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
            MarkerController.instance = new MarkerController(AdvancedMarkerElement, PinElement, map)
        } catch (error) {
            console.log(error);
            const errorMessage = 'Unable to initiazlie marker controller.'
            throw new Error(errorMessage)
        }

        return MarkerController.instance;
    }

    private createMarker(color: string, map: google.maps.Map) {

        const bluePin = new this.PinElement({
            background: color,
            borderColor: '#0F0F0F',
            glyphColor: '#0F0F0F'
        })

        const newMarker = new this.AdvancedMarkerElement({
            map: map,
            content: bluePin.element
        })

        return newMarker;
    }

    private createCurrentPositionMarker() {
        const currentPositionMarker = this.createMarker(MARKER_BLUE, this.map);
        return currentPositionMarker
    }

    createStartTrackingMarker(position: TPosition | google.maps.LatLngLiteral) {
        const startTrackingPositionMarker = this.createMarker(MARKER_GREEN, this.map);
        startTrackingPositionMarker.position = position
        this.startTrackingPositionMarker = startTrackingPositionMarker
    }

    createStopTrackingMarker(position: TPosition | google.maps.LatLngLiteral) {
        const stopTrackingPositionMarker = this.createMarker(MARKER_RED, this.map);
        stopTrackingPositionMarker.position = position;
        this.stopTrackingPositionMarker = stopTrackingPositionMarker;
    }

    setCurrentPositionMarkerPosition(position: TPosition | google.maps.LatLngLiteral ) {
        const { currentPositionMarker } = this;
        const isStrartPositionMarkerDefined = currentPositionMarker !== null;
        if (!isStrartPositionMarkerDefined) return;
        currentPositionMarker.position = position
    }

    removeStartMarker() {
        const {startTrackingPositionMarker} = this;
        const isStartTrackingPositionmarkerDefined = startTrackingPositionMarker !== null
        if (!isStartTrackingPositionmarkerDefined) return;
        startTrackingPositionMarker.map = null;
    }

    removeStopMarker() {
        const {stopTrackingPositionMarker} = this;
        const isStopTrackingPositionmarkerDefined = stopTrackingPositionMarker !== null
        if (!isStopTrackingPositionmarkerDefined) return;
        stopTrackingPositionMarker.map = null;
    }
}

export default MarkerController;