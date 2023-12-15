"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_lists_controller_1 = __importDefault(require("../controllers/contacts-lists.controller"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const contacts_lists_1 = __importDefault(require("../request-schemas/contacts-lists"));
const router = (0, express_1.Router)();
router.get('/contacts-lists', authenticate_1.default, contacts_lists_controller_1.default.getListContactsLists);
router.post('/contacts-lists', authenticate_1.default, (0, validateBody_1.default)(contacts_lists_1.default.createContactsListSchema), contacts_lists_controller_1.default.createContactsList);
router.put('/contacts-lists/:id', authenticate_1.default, isValidId_1.default, (0, validateBody_1.default)(contacts_lists_1.default.updateContactsListSchema), contacts_lists_controller_1.default.updateContactListById);
router.delete('/contacts-lists/:id', authenticate_1.default, isValidId_1.default, contacts_lists_controller_1.default.deleteContactsListById);
exports.default = router;
//# sourceMappingURL=contacts-lists.route.js.map