"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_handler_middleware_1 = __importDefault(require("../../api/middlewares/auth-handler.middleware"));
const request_id_validator_middleware_1 = __importDefault(require("../../api/middlewares/request-id-validator.middleware"));
const contact_actions_controller_1 = __importDefault(require("../controllers/contact-actions.controller"));
const router = (0, express_1.default)();
router.get("/email-open-tracking", contact_actions_controller_1.default.emailOpenTracking);
router.get("/email-link-tracking", contact_actions_controller_1.default.emailLinkTracking);
router.get("/unsubscribe", contact_actions_controller_1.default.unsubscribe);
router.get("/unsubscribe/users", auth_handler_middleware_1.default, contact_actions_controller_1.default.unsubscribedContactsList);
router.get("/unsubscribe/users/:id", auth_handler_middleware_1.default, request_id_validator_middleware_1.default, contact_actions_controller_1.default.unsubscribedContact);
router.get("/:id", auth_handler_middleware_1.default, request_id_validator_middleware_1.default, contact_actions_controller_1.default.contactActions);
exports.default = router;
//# sourceMappingURL=contact-actions.router.js.map