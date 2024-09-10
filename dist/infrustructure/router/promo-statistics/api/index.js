"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const general_stats_routes_1 = __importDefault(require("./routes/general-stats.routes"));
const referral_stats_route_1 = __importDefault(require("./routes/referral-stats.route"));
const internship_stats_routes_1 = __importDefault(require("./routes/internship-stats.routes"));
const router = (0, express_1.default)();
router.use('/general', general_stats_routes_1.default);
router.use('/referral', referral_stats_route_1.default);
router.use('/internship', internship_stats_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map