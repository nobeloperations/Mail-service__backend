"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_id_validator_middleware_1 = __importDefault(require("../middlewares/request-id-validator.middleware"));
const request_body_validator_1 = __importDefault(require("../middlewares/request-body-validator"));
const contacts_request_schemas_1 = __importDefault(require("../request-schemas/contacts.request-schemas"));
const contacts_controller_1 = __importDefault(require("../controllers/contacts.controller"));
const router = (0, express_1.Router)();
router.get('/', contacts_controller_1.default.getContactList);
router.put('/', (0, request_body_validator_1.default)(contacts_request_schemas_1.default.bulkUpdatingResouces), contacts_controller_1.default.batchUpdatingContacts);
router.delete('/', (0, request_body_validator_1.default)(contacts_request_schemas_1.default.bulkDeletingResouces), contacts_controller_1.default.batchDeletingContacts);
router.post('/', (0, request_body_validator_1.default)(contacts_request_schemas_1.default.createResourse), contacts_controller_1.default.createContact);
router.get('/:id', request_id_validator_middleware_1.default, contacts_controller_1.default.getContactById);
router.put('/:id', request_id_validator_middleware_1.default, (0, request_body_validator_1.default)(contacts_request_schemas_1.default.updateResource), contacts_controller_1.default.updateContactById);
router.delete('/:id', request_id_validator_middleware_1.default, contacts_controller_1.default.deleteContactById);
router.get('/:id/actions', request_id_validator_middleware_1.default, contacts_controller_1.default.getContactActions);
router.put('/:contactId/subscribe-to-list/:listId', contacts_controller_1.default.subscribeToList);
router.put('/:contactId/unsubscribe-from-list/:listId', contacts_controller_1.default.unsubscribeFromList);
exports.default = router;
//# sourceMappingURL=contacts.router.js.map