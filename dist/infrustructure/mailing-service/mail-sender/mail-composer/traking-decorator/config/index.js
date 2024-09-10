"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseLink = process.env.NODE_ENV === 'dev'
    ? process.env.BASE_TRACKING_MAIL_LINK_DEV
    : process.env.BASE_TRACKING_MAIL_LINK_PROD;
const config = {
    linksToTrack: {
        unsubscribeLink: {
            requestEndpoint: `${baseLink}/unsubscribe-from-mailing`,
            regExpMatchPattern: /(<a[^>]*href=")[^"]*("[^>]*>unsubscribe from this list.<\/a>)/
        }
    },
    baseTrakingForMailOpening: `${baseLink}/track-mail-opening`
};
exports.default = config;
//# sourceMappingURL=index.js.map