"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const mailing_automations_controller_1 = __importDefault(require("../controllers/mailing-automations.controller"));
const router = (0, express_1.default)();
router.get('/', mailing_automations_controller_1.default.getMailingAutomationsList);
router.post('/', mailing_automations_controller_1.default.createMailingAutomation);
router.get('/:id', isValidId_1.default, mailing_automations_controller_1.default.getMailingAutomationById);
router.put('/:id', isValidId_1.default, mailing_automations_controller_1.default.updateMailingAutomationById);
router.delete('/:id', isValidId_1.default, mailing_automations_controller_1.default.deleteMailingAutomationById);
router.post('/:id/add-contacts', mailing_automations_controller_1.default.addContactsToAutomation);
router.post('/:id/remove-contacts', mailing_automations_controller_1.default.removeContactsFromAutomation);
exports.default = router;
//# sourceMappingURL=mailing-automations.router.js.map