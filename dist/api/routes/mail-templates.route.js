"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mail_templates_controller_1 = __importDefault(require("../controllers/mail-templates.controller"));
const router = (0, express_1.default)();
router.get('/mail-templates/:id', mail_templates_controller_1.default.getMailTemplateDataById);
router.get('/mail-templates', mail_templates_controller_1.default.getMailTemplatesList);
router.post('/mail-templates', mail_templates_controller_1.default.createMailTemplates);
router.delete('/mail-templates/:id', mail_templates_controller_1.default.deleteMailTemplateById);
exports.default = router;
//# sourceMappingURL=mail-templates.route.js.map