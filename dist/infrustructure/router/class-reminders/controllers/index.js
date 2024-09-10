"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../services/index"));
const setClassReminders = async (req, res) => {
    try {
        const data = req.body;
        await index_1.default.setClassReminders(data);
        res.status(200).send('OK');
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};
const deleteClassRemindersByCourseIdentifier = async (req, res) => {
    try {
        const { courseIdentifier } = req.body;
        console.log(courseIdentifier);
        await index_1.default.deleteClassRemindersByCourseIdentifier(courseIdentifier);
        res.status(200).send('OK');
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};
exports.default = {
    setClassReminders,
    deleteClassRemindersByCourseIdentifier,
};
//# sourceMappingURL=index.js.map