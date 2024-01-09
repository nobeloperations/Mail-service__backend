"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const isTimeToSendMail = (scheduledMailData) => {
    const { scheduledDate } = scheduledMailData;
    return moment_timezone_1.default.utc().isSameOrAfter(scheduledDate);
};
exports.default = {
    isTimeToSendMail
};
//# sourceMappingURL=mail-time-coordinator.service.js.map