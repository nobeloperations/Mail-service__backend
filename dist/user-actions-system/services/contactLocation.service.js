"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationByIpAddress = void 0;
const API_KEY = process.env.LOCATION_API_KEY;
const getLocationByIpAddress = async (ip) => {
    if (!ip)
        return undefined;
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`);
        const { city, country_name, time_zone } = await response.json();
        return {
            city,
            country: country_name,
            timezone: time_zone.name
        };
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
};
exports.getLocationByIpAddress = getLocationByIpAddress;
//# sourceMappingURL=contactLocation.service.js.map