"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_id_validator_middleware_1 = __importDefault(require("../middlewares/request-id-validator.middleware"));
const mail_templates_controller_1 = __importDefault(require("../controllers/mail-templates.controller"));
const router = (0, express_1.default)();
router.get('/', mail_templates_controller_1.default.getMailTemplatesList);
router.post('/', mail_templates_controller_1.default.createMailTemplates);
router.get('/:id', request_id_validator_middleware_1.default, mail_templates_controller_1.default.getMailTemplateDataById);
router.put('/:id', request_id_validator_middleware_1.default, mail_templates_controller_1.default.updateMailTemplateDataById);
router.delete('/:id', request_id_validator_middleware_1.default, mail_templates_controller_1.default.deleteMailTemplateById);
exports.default = router;
//# sourceMappingURL=mail-templates.route.js.map