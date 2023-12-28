"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const auth_handler_middleware_1 = __importDefault(require("../middlewares/auth-handler.middleware"));
const request_body_validator_1 = __importDefault(require("../middlewares/request-body-validator"));
const auth_2 = __importDefault(require("../request-schemas/auth"));
const router = (0, express_1.default)();
router.post("/auth/register", (0, request_body_validator_1.default)(auth_2.default.registerSchema), auth_1.default.register);
router.post("/auth/login", (0, request_body_validator_1.default)(auth_2.default.loginSchema), auth_1.default.login);
router.post("/auth/logout", auth_handler_middleware_1.default, auth_1.default.logout);
router.get("/auth/current", auth_handler_middleware_1.default, auth_1.default.current);
exports.default = router;
//# sourceMappingURL=auth.js.map