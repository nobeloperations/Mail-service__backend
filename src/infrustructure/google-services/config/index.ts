import { google } from 'googleapis';

const googleOAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_ID,
    process.env.GMAIL_INTERNSHIP_PROFILE_CLIENT_SECRET,
    process.env.GOOGLE_AUTH_REDIRECT_URI
);

googleOAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_INTERNSHIP_PROFILE_REFRESH_TOKEN });

export default googleOAuth2Client;