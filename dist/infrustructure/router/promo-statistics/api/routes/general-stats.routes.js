"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const general_stats_controller_1 = __importDefault(require("../controllers/general-stats.controller"));
const router = (0, express_1.Router)();
router.get('/years', general_stats_controller_1.default.getYearsStats);
router.get('/countries', general_stats_controller_1.default.getCountriesStats);
router.get('/contacts-age', general_stats_controller_1.default.getContactsAgeStats);
router.get('/referral-resources', general_stats_controller_1.default.getReferralResourcesStats);
router.get('/contacts-countries', general_stats_controller_1.default.getContactsNumberGroupedByCountry);
exports.default = router;
//# sourceMappingURL=general-stats.routes.js.map