"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REFRESH_TOKEN } = process.env;
const transportOptions = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'nikita.k@nobelcoaching.com',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_CLIENT_REFRESH_TOKEN,
    }
};
const transporter = nodemailer.createTransport(transportOptions);
const sentComposedMail = async (emailReceiver, composedMail) => {
    await transporter.sendMail({
        to: emailReceiver,
        subject: 'Nodemailer test',
        html: composedMail,
    });
};
exports.default = {
    sentComposedMail
};
//# sourceMappingURL=mail-sender.service.js.map