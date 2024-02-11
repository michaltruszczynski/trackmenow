import loader from "../GoogleMapLoader";
const position = { lat: -25.344, lng: 131.031 };

class GoogleMap {
    private static instance: google.maps.Map
    private constructor() { }

    static async getInstance(mapContainer: HTMLElement) {
        try {
            const { instance } = GoogleMap
            const isGoogleMapInstanceDefined = instance !== undefined
            if (isGoogleMapInstanceDefined) {
                return instance
            }
            
            const { Map } = await loader.importLibrary('maps');
            GoogleMap.instance = new Map(mapContainer, {
                zoom: 14,
                center: position,
                mapId: 'DEMO_MAP_ID',
                streetViewControl: false
            })
            return GoogleMap.instance;
        } catch (error) {
            console.log(error)
            throw new Error('Unable to load map.')
        }
    }
}

export default GoogleMap;