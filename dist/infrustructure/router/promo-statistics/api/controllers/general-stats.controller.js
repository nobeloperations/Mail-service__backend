"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const general_stats_service_1 = __importDefault(require("../services/general-stats.service"));
const getCountriesStats = async (_, res) => {
    const result = await general_stats_service_1.default.getCountriesStats();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getContactsAgeStats = async (_, res) => {
    const result = await general_stats_service_1.default.getContactsAgeStats();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getReferralResourcesStats = async (_, res) => {
    const result = await general_stats_service_1.default.getReferralResourcesStats();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getYearsStats = async (_, res) => {
    const result = await general_stats_service_1.default.getYearsStats();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getContactsNumberGroupedByCountry = async (_, res) => {
    const result = await general_stats_service_1.default.getContactsNumberGroupedByCountry();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.default = {
    getYearsStats,
    getCountriesStats,
    getContactsAgeStats,
    getReferralResourcesStats,
    getContactsNumberGroupedByCountry
};
//# sourceMappingURL=general-stats.controller.js.map