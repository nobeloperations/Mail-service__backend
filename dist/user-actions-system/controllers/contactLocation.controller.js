"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = void 0;
const contactLocation_service_1 = require("../services/contactLocation.service");
const http_status_codes_1 = require("http-status-codes");
const getLocation = async (req, res) => {
    try {
        const contactIP = req.ip;
        const locationData = await (0, contactLocation_service_1.fetchLocation)(contactIP);
        // Check if the location data is available
        if (locationData) {
            res.status(http_status_codes_1.StatusCodes.OK).json(locationData);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Location data not found' });
        }
    }
    catch (error) {
        console.error('Error in getLocation controller:', error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
exports.getLocation = getLocation;
//# sourceMappingURL=contactLocation.controller.js.map