"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const { GMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REFRESH_TOKEN } = process.env;
const transportOptions = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: GMAIL_USER,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_CLIENT_REFRESH_TOKEN,
    }
};
const transporter = nodemailer.createTransport(transportOptions);
const sentComposedMail = async (emailReceiver, composedMail) => {
    await transporter.sendMail({
        to: emailReceiver,
        subject: 'Eduquest event',
        html: composedMail,
    });
};
exports.default = {
    sentComposedMail
};
//# sourceMappingURL=mail-sender.service.js.map