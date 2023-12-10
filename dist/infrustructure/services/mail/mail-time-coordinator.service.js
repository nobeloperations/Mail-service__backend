"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const isTimeToSendMail = (scheduledMailData, contactData) => {
    const { timeZone, scheduledDate, useContactTimezone } = scheduledMailData;
    const scheduledUtcDate = useContactTimezone
        ? moment_timezone_1.default.utc(scheduledDate).tz(contactData.timezone)
        : moment_timezone_1.default.utc(scheduledDate).tz(timeZone);
    const currentUtcTime = moment_timezone_1.default.utc();
    return currentUtcTime.isSameOrAfter(scheduledUtcDate);
};
exports.default = {
    isTimeToSendMail
};
//# sourceMappingURL=mail-time-coordinator.service.js.map