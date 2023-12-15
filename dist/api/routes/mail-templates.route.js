"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const mail_templates_controller_1 = __importDefault(require("../controllers/mail-templates.controller"));
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const mail_templates_1 = __importDefault(require("../request-schemas/mail-templates"));
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const router = (0, express_1.default)();
router.get('/mail-templates/:id', authenticate_1.default, isValidId_1.default, mail_templates_controller_1.default.getMailTemplateDataById);
router.get('/mail-templates', authenticate_1.default, mail_templates_controller_1.default.getMailTemplatesList);
router.post('/mail-templates', authenticate_1.default, (0, validateBody_1.default)(mail_templates_1.default.createTemplateSchema), mail_templates_controller_1.default.createMailTemplates);
router.delete('/mail-templates/:id', authenticate_1.default, isValidId_1.default, mail_templates_controller_1.default.deleteMailTemplateById);
exports.default = router;
//# sourceMappingURL=mail-templates.route.js.map