"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const OAuth2GoogleClient = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CLIENT_REDIRECT_URI);
OAuth2GoogleClient.setCredentials({ refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN });
exports.default = OAuth2GoogleClient;
//# sourceMappingURL=auth-google-client.js.map