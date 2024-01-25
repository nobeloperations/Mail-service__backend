const nodemailer = require('nodemailer');

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_REFRESH_TOKEN
} = process.env;

const transportOptions = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'internships@nobelcoaching.com',
        pass: 'Nobel!2021'
    }
};

const transporter = nodemailer.createTransport(transportOptions);

const sentComposedMail = async (emailReceiver: string, composedMail: string) => {
    await transporter.sendMail({
        to: emailReceiver,
        subject: 'Nodemailer test',
        html: composedMail,
    });
};


export default {
    sentComposedMail
}