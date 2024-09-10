import { Contact } from '@prisma/client';

import staticPlaceholderHandlers from './handlers/static-data.handlers';
import dynamicPlaceholderHandlers from './handlers/dynamic-data.handlers';

const replacePlaceholders = async (text: string, contactData: Contact, additionalData?: Object) => {
    const placeholderIdentifierRegex = /%(\w+)%/g;
    const replacements = await Promise.all(
        Array.from(text.matchAll(placeholderIdentifierRegex), async ([match, placeholder]) => {
            const handler = staticPlaceholderHandlers[`%${placeholder}%`] || dynamicPlaceholderHandlers[`%${placeholder}%`];
            const result = handler ? await handler(contactData) : match;

            return { match, result };
        })
    );

    let formattedMailText = text;
    replacements.forEach(({ match, result }) => {
        formattedMailText = formattedMailText.replace(match, result);
    });

    if (additionalData) {
        formattedMailText = replaceAdditionalDataPlaceholders(formattedMailText, additionalData);
    }

    return formattedMailText;
};

const replaceAdditionalDataPlaceholders = (mailText, additionalData) => {
    Object.entries(additionalData).forEach(([key, value]) => {
        const regex = new RegExp(key, 'g');
        mailText = mailText.replace(regex, value);
    });

    return mailText;
};


export default {
    replacePlaceholders
};