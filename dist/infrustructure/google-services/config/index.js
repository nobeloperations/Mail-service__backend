"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const googleOAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_ID, process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_SECRET, process.env.GOOGLE_AUTH_REDIRECT_URI);
googleOAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_INTERNSHIP_PROFILE_REFRESH_TOKEN });
exports.default = googleOAuth2Client;
//# sourceMappingURL=index.js.map