export const internshipMailingProfileConfig = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_INTERNSHIP_PROFILE,
        clientId: process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_INTERNSHIP_PROFILE_REFRESH_TOKEN,
    }
};

export const weekendEqEventMailingProfileConfig = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE,
        clientId: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_WEEKEND_EQ_EVENT_PROFILE_REFRESH_TOKEN,
    }
};

export const weekdayEqEventMailingProfileConfig = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE,
        clientId: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_WEEKDAY_EQ_EVENT_PROFILE_REFRESH_TOKEN,
    }
};