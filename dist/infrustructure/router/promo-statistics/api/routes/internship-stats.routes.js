"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const internship_stats_controller_1 = __importDefault(require("../controllers/internship-stats.controller"));
const router = (0, express_1.Router)();
router.get('/contacts-age/:intakeId', internship_stats_controller_1.default.getContactsAgeStats);
router.get('/contact-results/:intakeId', internship_stats_controller_1.default.getContactResults);
router.get('/global-distribution/:intakeId', internship_stats_controller_1.default.getGlobalDistributionStats);
router.get('/show-up-distribution/:intakeId', internship_stats_controller_1.default.getSuccessfulPassedStatsByCountry);
exports.default = router;
//# sourceMappingURL=internship-stats.routes.js.map