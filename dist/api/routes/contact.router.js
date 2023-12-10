"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = __importDefault(require("../controllers/contactController"));
const exception_interceptor_middleware_1 = __importDefault(require("../middlewares/exception-interceptor.middleware"));
const router = (0, express_1.Router)();
router.get('/contact', (0, exception_interceptor_middleware_1.default)(contactController_1.default.getContactList));
router.get('/contact/:id', (0, exception_interceptor_middleware_1.default)(contactController_1.default.getContactById));
router.post('/contact', (0, exception_interceptor_middleware_1.default)(contactController_1.default.createContact));
router.put('/contact/:id', (0, exception_interceptor_middleware_1.default)(contactController_1.default.updateContactById));
router.delete('/contact/:id', (0, exception_interceptor_middleware_1.default)(contactController_1.default.deleteContactById));
exports.default = router;
//# sourceMappingURL=contact.router.js.map