"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mail_templates_route_1 = __importDefault(require("./api/routes/mail-templates.route"));
const scheduled_mails_router_1 = __importDefault(require("./api/routes/scheduled-mails.router"));
const auth_1 = __importDefault(require("./api/routes/auth"));
const contacts_router_1 = __importDefault(require("./api/routes/contacts.router"));
const unsubscribe_router_1 = __importDefault(require("./user-actions-system/routes/unsubscribe.router"));
const openedEmails_router_1 = __importDefault(require("./user-actions-system/routes/openedEmails.router"));
const clickedLinks_router_1 = __importDefault(require("./user-actions-system/routes/clickedLinks.router"));
const userActions_router_1 = __importDefault(require("./user-actions-system/routes/userActions.router"));
const contacts_lists_route_1 = __importDefault(require("./api/routes/contacts-lists.route"));
const sent_pending_mails_1 = __importDefault(require("./cron-jobs/jobs/sent-pending-mails"));
const prisma_error_handler_1 = __importDefault(require("./api/middlewares/prisma-error-handler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, express_fileupload_1.default)({ limits: { fileSize: 50 * 1024 * 1024 } }));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_options_1 = __importDefault(require("./docs/swagger-options"));
const specs = (0, swagger_jsdoc_1.default)(swagger_options_1.default);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use('/api', mail_templates_route_1.default);
app.use('/api', scheduled_mails_router_1.default);
app.use('/api', auth_1.default);
app.use('/api', contacts_router_1.default);
app.use('/api', contacts_lists_route_1.default);
app.use('/action', openedEmails_router_1.default);
app.use('/action', clickedLinks_router_1.default);
app.use('/action', unsubscribe_router_1.default);
app.use('/action', userActions_router_1.default);
app.get('/test', async (req, res, next) => {
    const result = await (0, sent_pending_mails_1.default)();
    res.json({ result });
});
app.use(prisma_error_handler_1.default);
// app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    res.status(status).json({ message: err.message });
});
// startCronJobs();
exports.default = app;
//# sourceMappingURL=app.js.map