"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLocation = void 0;
async function fetchLocation(ip) {
    try {
        // Fetch location details from the Positionstack API based on the provided IP address
        const apiUrl = `http://api.positionstack.com/v1/reverse?access_key=b69247c6cee0ac2d9ace48a04d8f6618&query=${ip}`;
        const locationResponse = await fetch(apiUrl);
        const [locationData] = await locationResponse.json();
        return {
            ip,
            locality: locationData.locality,
            region: locationData.region,
            country: locationData.country,
            timezone: locationData.timezone,
            // Add other properties as needed
        };
    }
    catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
}
exports.fetchLocation = fetchLocation;
//# sourceMappingURL=contactLocation.service.js.map