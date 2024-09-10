"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./controllers/index"));
const requested_schema_1 = __importDefault(require("./requested-schema"));
const request_body_validator_1 = __importDefault(require("../../../api/middlewares/request-body-validator"));
const router = (0, express_1.default)();
router.post('/set-class-reminders', (0, request_body_validator_1.default)(requested_schema_1.default), index_1.default.setClassReminders);
router.post('/delete-class-reminders', index_1.default.deleteClassRemindersByCourseIdentifier);
exports.default = router;
//# sourceMappingURL=index.js.map