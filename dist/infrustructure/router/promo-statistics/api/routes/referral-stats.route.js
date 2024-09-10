"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referral_stats_controller_1 = __importDefault(require("../controllers/referral-stats.controller"));
const router = (0, express_1.Router)();
router.get('/links', referral_stats_controller_1.default.getReferralLinksgStats);
router.post('/track-referral-link/:referralCode', referral_stats_controller_1.default.trackReferralLink);
exports.default = router;
//# sourceMappingURL=referral-stats.route.js.map