import { google } from 'googleapis';

const OAuth2GoogleClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_REDIRECT_URI
);

OAuth2GoogleClient.setCredentials({ refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN });

export default OAuth2GoogleClient;