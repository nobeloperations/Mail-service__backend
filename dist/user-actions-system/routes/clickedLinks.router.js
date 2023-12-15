"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clickedLinks_controller_1 = __importDefault(require("../controllers/clickedLinks.controller"));
const router = (0, express_1.default)();
router.get("/email-link-tracking", clickedLinks_controller_1.default.emailLinkTracking);
exports.default = router;
//# sourceMappingURL=clickedLinks.router.js.map