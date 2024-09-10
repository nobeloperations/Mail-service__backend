"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const request_schema_1 = __importDefault(require("./request-schema"));
const request_body_validator_1 = __importDefault(require("../../../api/middlewares/request-body-validator"));
const router = (0, express_1.default)();
router.post('/set-compiler-mailing', (0, request_body_validator_1.default)(request_schema_1.default), controller_1.default.setCompilerMailing);
exports.default = router;
//# sourceMappingURL=index.js.map