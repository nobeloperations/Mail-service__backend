"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTimestampField = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function generateTimestampField(timezone, eduQuestSelectedDateTime) {
    if (eduQuestSelectedDateTime) {
        const dateTime = (0, moment_timezone_1.default)(eduQuestSelectedDateTime);
        const formattedTimestamp = dateTime
            .tz(timezone)
            .format('MMMM DD, YYYY HH:mm [GMT]Z');
        return formattedTimestamp;
    }
    return null;
}
exports.generateTimestampField = generateTimestampField;
//# sourceMappingURL=generate-timestamp.js.map