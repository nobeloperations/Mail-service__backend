"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const internship_stats_service_1 = __importDefault(require("../services/internship-stats.service"));
const getContactResults = async (req, res) => {
    const { intakeId } = req.params;
    const result = await internship_stats_service_1.default.getContactResults(intakeId);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getGlobalDistributionStats = async (req, res) => {
    const { intakeId } = req.params;
    const result = await internship_stats_service_1.default.getGlobalDistributionStats(intakeId);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getContactsAgeStats = async (req, res) => {
    const { intakeId } = req.params;
    const result = await internship_stats_service_1.default.getContactsAgeStats(intakeId);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getSuccessfulPassedStatsByCountry = async (req, res) => {
    const { intakeId } = req.params;
    const result = await internship_stats_service_1.default.getSuccessfulPassedStatsByCountry(intakeId);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.default = {
    getContactResults,
    getContactsAgeStats,
    getGlobalDistributionStats,
    getSuccessfulPassedStatsByCountry,
};
//# sourceMappingURL=internship-stats.controller.js.map