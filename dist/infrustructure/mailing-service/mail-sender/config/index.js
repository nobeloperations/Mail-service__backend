"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekdayEqEventMailingProfileConfig = exports.weekendEqEventMailingProfileConfig = exports.internshipMailingProfileConfig = void 0;
exports.internshipMailingProfileConfig = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_INTERNSHIP_PROFILE,
        clientId: process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_INTERNSHIP_PROFILE_REFRESH_TOKEN,
    }
};
exports.weekendEqEventMailingProfileConfig = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE,
        clientId: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE_REFRESH_TOKEN,
    }
};
exports.weekdayEqEventMailingProfileConfig = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE,
        clientId: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE_REFRESH_TOKEN,
    }
};
//# sourceMappingURL=index.js.map