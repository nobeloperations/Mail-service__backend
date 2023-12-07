const nodemailer = require('nodemailer');
require("dotenv").config()

import ScheduledMailsService from '../services/scheduled-mails.service';
import ContactDataService from '../services/contactData'
import SendedMailsService from '../services/sended-mails'
import { replacePlaceholdersWithContactDataInMailTemplate } from "../../mails-processor/mail-placeholder-replacer"
import { Contact } from '@prisma/client';

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REFRESH_TOKEN} = process.env


const config = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'nikita.k@nobelcoaching.com',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_CLIENT_REFRESH_TOKEN,
    }
}
const transporter = nodemailer.createTransport(config);
  
const sentPendingMails = async () => {
    const pendingMails = await ScheduledMailsService.retrievePendingMails();
    pendingMails.map(async ({contactId, id, ...restOfFields}) => {
        const contactData = await ContactDataService.retrieveContactData(contactId)
        const proccessedMessage = await replacePlaceholdersWithContactDataInMailTemplate(`<html><body>
        <p>Hi, I test everything</p>
        <img src="http://localhost:3000/tracking?emailId=${id}" width="1" height="1" />
        </body></html>`, contactData)

        transporter
        .sendMail(setAppropriateMailOptions(contactData, proccessedMessage))
        .then(() => {
            ScheduledMailsService.deletePendingMail(id)
            SendedMailsService.addSendedMail({...restOfFields, contactId})
        })
        .catch(err => console.log(err.message));
    }) 
};

function setAppropriateMailOptions(contactData: Contact, html: string){
    return {
        to: contactData.email,
        subject: 'Nodemailer test',
        html,
      };
}

export default sentPendingMails;