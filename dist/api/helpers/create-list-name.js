"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const createNameForContactsList = (eduQuestDate) => {
    const dayOfWeek = (0, moment_1.default)(eduQuestDate).day();
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const date = new Date(eduQuestDate);
    const formattedDate = date.toLocaleDateString('en-US', options);
    if (dayOfWeek === 6 || dayOfWeek === 0) {
        return `Internship Weekend: ${formattedDate}`;
    }
    return `Internship Weekday: ${formattedDate}`;
};
exports.default = createNameForContactsList;
//# sourceMappingURL=create-list-name.js.map