"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
exports.default = (passport) => {
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_ID,
        clientSecret: process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_SECRET,
        callbackURL: `https://${process.env.SERVER_DOMAIN}/auth/google/callback`,
    }, (accessToken, refreshToken, profile, done) => {
        const userEmailDomain = profile.emails[0].value.split('@')[1];
        const targetDomain = process.env.ALLOWED_GOOGLE_DOMAIN;
        if (userEmailDomain === targetDomain) {
            done(null, profile);
        }
        else {
            done(null, false);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
//# sourceMappingURL=passport.js.map