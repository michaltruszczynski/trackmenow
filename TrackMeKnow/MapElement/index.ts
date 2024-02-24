import PageHTMLElement from "../../../PageHTMLElement";

export type TPosition = {
    latitude: number,
    longitude: number,
    date: Date;
}

class MapElement {
    private googleMapContainer: PageHTMLElement<'div'>;
    constructor() {
        // lub dajemy jako konstructor
        this.googleMapContainer = new PageHTMLElement('div', { ui: { className: 'map-container' } });
    }

    displayMarkers(position: TPosition) {

    }

    initializeMap() {

    }

    centerMap() {
        
    }
}

export default MapElement;