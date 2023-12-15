"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openedEmails_controller_1 = __importDefault(require("../controllers/openedEmails.controller"));
const router = (0, express_1.default)();
router.get("/email-open-tracking", openedEmails_controller_1.default.emailOpenTracking);
exports.default = router;
//# sourceMappingURL=openedEmails.router.js.map