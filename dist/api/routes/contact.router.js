"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const contacts_controller_1 = __importDefault(require("../controllers/contacts.controller"));
const exception_interceptor_middleware_1 = __importDefault(require("../middlewares/exception-interceptor.middleware"));
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const router = (0, express_1.Router)();
router.get('/contact', authenticate_1.default, (0, exception_interceptor_middleware_1.default)(contacts_controller_1.default.getContactList));
router.get('/contact/:id', authenticate_1.default, isValidId_1.default, (0, exception_interceptor_middleware_1.default)(contacts_controller_1.default.getContactById));
router.post('/contact', authenticate_1.default, (0, exception_interceptor_middleware_1.default)(contacts_controller_1.default.createContact));
router.put('/contact/:id', authenticate_1.default, isValidId_1.default, (0, exception_interceptor_middleware_1.default)(contacts_controller_1.default.updateContactById));
router.delete('/contact/:id', authenticate_1.default, isValidId_1.default, (0, exception_interceptor_middleware_1.default)(contacts_controller_1.default.deleteContactById));
exports.default = router;
//# sourceMappingURL=contact.router.js.map