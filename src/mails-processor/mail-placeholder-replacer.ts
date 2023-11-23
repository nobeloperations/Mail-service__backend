import { Contact } from '@prisma/client';

import PlaceholderService from './services/placeholder.service';

const replacePlaceholdersWithContactDataInMailTemplate = async (mailText: string, contactData: Contact): Promise<string> => {
    const contactDataplaceholderRegex = /%(\w+)%/g;
    const placeholdersData = await PlaceholderService.getMapCollectionOfContactPlaceholders();

    const formatedMailText = mailText.replace(contactDataplaceholderRegex, (match, placeholder) => {
        const targetContactField = placeholdersData.get(match);

        return placeholdersData.get(match) && contactData.hasOwnProperty(targetContactField)
            ? contactData[targetContactField]
            : match;
    });

    return formatedMailText;
};

export default {
    replacePlaceholdersWithContactDataInMailTemplate
}