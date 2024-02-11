import { Loader } from "@googlemaps/js-api-loader";
import dotenv from 'dotenv';

dotenv.config();

const USER_API_KEY = process.env.GOOGLE_MAP_API ? process.env.GOOGLE_MAP_API : '';
const googleMapLoader = new Loader({
    apiKey: USER_API_KEY,
    version: "weekly"
});

export default googleMapLoader