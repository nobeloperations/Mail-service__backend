"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const contacts_request_schemas_1 = __importDefault(require("../request-schemas/contacts.request-schemas"));
const contacts_controller_1 = __importDefault(require("../controllers/contacts.controller"));
const router = (0, express_1.Router)();
router.get('/', contacts_controller_1.default.getContactList);
router.put('/', (0, validateBody_1.default)(contacts_request_schemas_1.default.bulkUpdatingResouces), contacts_controller_1.default.batchUpdatingContacts);
router.delete('/', (0, validateBody_1.default)(contacts_request_schemas_1.default.bulkDeletingResouces), contacts_controller_1.default.batchDeletingContacts);
router.post('/', (0, validateBody_1.default)(contacts_request_schemas_1.default.createResourse), contacts_controller_1.default.createContact);
router.get('/:id', isValidId_1.default, contacts_controller_1.default.getContactById);
router.put('/:id', isValidId_1.default, (0, validateBody_1.default)(contacts_request_schemas_1.default.updateResource), contacts_controller_1.default.updateContactById);
router.delete('/:id', isValidId_1.default, contacts_controller_1.default.deleteContactById);
exports.default = router;
//# sourceMappingURL=contacts.router.js.map