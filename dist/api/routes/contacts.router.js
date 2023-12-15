"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_controller_1 = __importDefault(require("../controllers/contacts.controller"));
const router = (0, express_1.Router)();
router.get('/contacts', contacts_controller_1.default.getContactList);
router.get('/contacts/:id', contacts_controller_1.default.getContactById);
router.post('/contacts', contacts_controller_1.default.createContact);
router.put('/contacts/:id', contacts_controller_1.default.updateContactById);
router.delete('/contacts/:id', contacts_controller_1.default.deleteContactById);
router.put('/contacts', contacts_controller_1.default.batchUpdatingContacts);
router.delete('/contacts', contacts_controller_1.default.batchDeletingContacts);
exports.default = router;
//# sourceMappingURL=contacts.router.js.map