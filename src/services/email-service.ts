import nodemailer from 'nodemailer'; 

export const sendEmail = async (reciverMail: string) => {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_TEST_PROFILE,
        clientId: process.env.GOOGLE_CLIENT_ID,
        accessUrl: process.env.GOOGLE_ACCESS_URL,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    });

    const info = await transporter.sendMail({
        from: `"Fred Foo 👻"  ${process.env.GMAIL_TEST_PROFILE}`, 
        to: `${reciverMail}`,
        subject: "Hello ✔", 
        text: "Hello world?",
        html: "<b>Hello world? (html)</b>",
      });

    console.log('Email sent: ' + info.response);
};

