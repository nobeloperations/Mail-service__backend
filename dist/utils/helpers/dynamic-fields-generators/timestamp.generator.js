"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const generateEqTimestampFieldBasedOnEqSelectedDate = (targetTimezone, eqDateTime) => {
    const momentDate = (0, moment_1.default)(eqDateTime);
    const formatedDate = momentDate.tz(targetTimezone).format('MMMM DD, YYYY HH:mm');
    return `${formatedDate} ${targetTimezone}`;
};
exports.default = generateEqTimestampFieldBasedOnEqSelectedDate;
//# sourceMappingURL=timestamp.generator.js.map