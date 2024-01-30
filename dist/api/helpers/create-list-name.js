"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const createNameForContactsList = (eduQuestDate) => {
    const momentDate = (0, moment_1.default)(eduQuestDate);
    const dayOfWeek = momentDate.day();
    const formattedDate = momentDate.format('MMMM D, YYYY, hh:mm A');
    if (dayOfWeek === 6 || dayOfWeek === 0) {
        return `Internship Weekend: ${formattedDate}`;
    }
    return `Internship Weekday: ${formattedDate}`;
};
exports.default = createNameForContactsList;
//# sourceMappingURL=create-list-name.js.map