"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const sent_pending_mails_1 = __importDefault(require("./jobs/sent-pending-mails"));
const startCronJobs = () => {
    node_cron_1.default.schedule('*/15 * * * * *', sent_pending_mails_1.default);
};
exports.default = startCronJobs;
//# sourceMappingURL=index.js.map