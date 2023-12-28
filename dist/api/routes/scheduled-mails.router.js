"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_id_validator_middleware_1 = __importDefault(require("../middlewares/request-id-validator.middleware"));
const request_body_validator_1 = __importDefault(require("../middlewares/request-body-validator"));
const scheduled_mails_1 = __importDefault(require("../request-schemas/scheduled-mails"));
const scheduled_mails_controller_1 = __importDefault(require("../controllers/scheduled-mails.controller"));
const router = (0, express_1.Router)();
router.get('/', scheduled_mails_controller_1.default.getMailsList);
router.post('/', (0, request_body_validator_1.default)(scheduled_mails_1.default.createMailSchema), scheduled_mails_controller_1.default.createMails);
router.get('/:id', request_id_validator_middleware_1.default, scheduled_mails_controller_1.default.getMailById);
router.put('/:id', request_id_validator_middleware_1.default, (0, request_body_validator_1.default)(scheduled_mails_1.default.updateMailSchema), scheduled_mails_controller_1.default.updateMailById);
router.delete('/:id', request_id_validator_middleware_1.default, scheduled_mails_controller_1.default.deleteMailById);
exports.default = router;
//# sourceMappingURL=scheduled-mails.router.js.map