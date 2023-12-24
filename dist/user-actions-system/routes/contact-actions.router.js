"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../../api/middlewares/authenticate"));
const isValidId_1 = __importDefault(require("../../api/middlewares/isValidId"));
const contact_actions_controller_1 = __importDefault(require("../controllers/contact-actions.controller"));
const router = (0, express_1.default)();
router.get("/email-open-tracking", contact_actions_controller_1.default.emailOpenTracking);
router.get("/email-link-tracking", contact_actions_controller_1.default.emailLinkTracking);
router.get("/unsubscribe", contact_actions_controller_1.default.unsubscribe);
router.get("/unsubscribe/users", authenticate_1.default, contact_actions_controller_1.default.unsubscribedContactsList);
router.get("/unsubscribe/users/:id", authenticate_1.default, isValidId_1.default, contact_actions_controller_1.default.unsubscribedContact);
router.get("/:id", authenticate_1.default, isValidId_1.default, contact_actions_controller_1.default.contactActions);
exports.default = router;
//# sourceMappingURL=contact-actions.router.js.map