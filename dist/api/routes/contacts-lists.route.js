"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_lists_controller_1 = __importDefault(require("../controllers/contacts-lists.controller"));
const router = (0, express_1.Router)();
router.get('/contacts-lists', contacts_lists_controller_1.default.getListContactsLists);
router.post('/contacts-lists', contacts_lists_controller_1.default.createContactsList);
router.put('/contacts-lists/:id', contacts_lists_controller_1.default.updateContactListById);
router.delete('/contacts-lists/:id', contacts_lists_controller_1.default.deleteContactsListById);
exports.default = router;
//# sourceMappingURL=contacts-lists.route.js.map