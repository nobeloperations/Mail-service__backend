"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const referrals_stats_service_1 = __importDefault(require("../services/referrals-stats.service"));
const trackReferralLink = async (req, res) => {
    const { referralCode } = req.params;
    const result = await referrals_stats_service_1.default.trackReferralLink(referralCode);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const getReferralLinksgStats = async (req, res) => {
    const from = !isNaN(new Date(req.query.from).getTime()) ? new Date(req.query.from) : undefined;
    const to = !isNaN(new Date(req.query.to).getTime()) ? new Date(req.query.to) : undefined;
    console.log(from);
    const result = await referrals_stats_service_1.default.getReferralLinksgStats(from, to);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.default = {
    trackReferralLink,
    getReferralLinksgStats
};
//# sourceMappingURL=referral-stats.controller.js.map