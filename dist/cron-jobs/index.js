"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const sent_pending_mails_1 = __importDefault(require("./jobs/sent-pending-mails"));
const close_expired_intakes_1 = __importDefault(require("./jobs/close-expired-intakes"));
const startCronJobs = () => {
    node_cron_1.default.schedule('*/5 * * * *', sent_pending_mails_1.default);
    node_cron_1.default.schedule('0 */12 * * *', close_expired_intakes_1.default);
};
exports.default = startCronJobs;
//# sourceMappingURL=index.js.map