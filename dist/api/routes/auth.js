"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const auth_2 = __importDefault(require("../request-schemas/auth"));
const router = (0, express_1.default)();
router.post("/auth/register", (0, validateBody_1.default)(auth_2.default.registerSchema), auth_1.default.register);
router.post("/auth/login", (0, validateBody_1.default)(auth_2.default.loginSchema), auth_1.default.login);
router.post("/auth/logout", authenticate_1.default, auth_1.default.logout);
router.get("/auth/current", authenticate_1.default, auth_1.default.current);
exports.default = router;
//# sourceMappingURL=auth.js.map