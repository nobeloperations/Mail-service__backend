"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scheduled_mails_controller_1 = __importDefault(require("../controllers/scheduled-mails.controller"));
const router = (0, express_1.Router)();
router.get('/scheduled-mails', scheduled_mails_controller_1.default.getMailsList);
router.get('/scheduled-mails/:id', scheduled_mails_controller_1.default.getMailById);
router.post('/scheduled-mails', scheduled_mails_controller_1.default.createMails);
router.put('/scheduled-mails/:id', scheduled_mails_controller_1.default.updateMailById);
router.delete('/scheduled-mails/:id', scheduled_mails_controller_1.default.deleteMailById);
exports.default = router;
//# sourceMappingURL=scheduled-mails.router.js.map