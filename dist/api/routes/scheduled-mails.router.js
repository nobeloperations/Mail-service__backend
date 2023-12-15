"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scheduled_mails_controller_1 = __importDefault(require("../controllers/scheduled-mails.controller"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const scheduled_mails_1 = __importDefault(require("../request-schemas/scheduled-mails"));
const router = (0, express_1.Router)();
router.get('/scheduled-mails', authenticate_1.default, scheduled_mails_controller_1.default.getMailsList);
router.get('/scheduled-mails/:id', authenticate_1.default, isValidId_1.default, scheduled_mails_controller_1.default.getMailById);
router.post('/scheduled-mails', authenticate_1.default, (0, validateBody_1.default)(scheduled_mails_1.default.createMailSchema), scheduled_mails_controller_1.default.createMails);
router.put('/scheduled-mails/:id', authenticate_1.default, isValidId_1.default, (0, validateBody_1.default)(scheduled_mails_1.default.updateMailSchema), scheduled_mails_controller_1.default.updateMailById);
router.delete('/scheduled-mails/:id', authenticate_1.default, isValidId_1.default, scheduled_mails_controller_1.default.deleteMailById);
exports.default = router;
//# sourceMappingURL=scheduled-mails.router.js.map