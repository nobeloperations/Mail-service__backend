"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promo_mailing_1 = __importDefault(require("./promo-mailing"));
const sending_eq_results_1 = __importDefault(require("./sending-eq-results"));
const applying_internship_1 = __importDefault(require("./applying-internship"));
const statistics_1 = __importDefault(require("./statistics"));
const router = (0, express_1.default)();
router.post('/contact-form-creation', async (req, res) => {
    const contactData = req.body;
    const userIpAddress = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
    const result = await (0, applying_internship_1.default)(contactData, userIpAddress);
    res.status(200).send('OK');
});
router.post('/process-contacts-results', async (req, res) => {
    const data = req.body;
    const result = await (0, sending_eq_results_1.default)(data);
    res.status(200).json(result);
});
router.post('/schedule-promo-mail-about-nobel-channels', async (req, res) => {
    const { startDate, endDate } = req.body;
    const result = await promo_mailing_1.default.scheduleMailingsAboutNobelChannels(startDate, endDate);
    res.status(200).json(result);
});
router.get('/statistics/unique-countries', async (req, res) => {
    const result = await statistics_1.default.getUniqueCountries();
    res.status(200).json(result);
});
router.get('/statistics/contacts-age', async (req, res) => {
    const result = await statistics_1.default.getGeneralStatisctsAboutParticipantsAge();
    res.status(200).json(result);
});
exports.default = router;
//# sourceMappingURL=index.js.map