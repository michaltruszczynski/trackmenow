import PageHTMLElement from "../../../PageHTMLElement";

export type TPosition = {
    latitude: number,
    longitude: number,
    date: Date;
}

class MapElement {
    private googleMapContainer: PageHTMLElement<'div'>;
    constructor() {
        this.googleMapContainer = new PageHTMLElement('div', { ui: { className: 'map-container' } });
    }

    displayMarkers(position: TPosition) {

    }
}

export default MapElement;