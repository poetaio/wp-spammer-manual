const nodemailer = require("nodemailer");
const emailService = require("./EmailService");

class SpamService {
    async spam(subject, text) {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SPAM_USER,
                pass: process.env.SPAM_PASSWORD,
            },
        });

        const emails = await emailService.getAll(1000, 0);
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "test.ilia22@gmail.com",
            // to: emails.rows.map((e) => e.email).join(', '), // list of receivers
            to: emails.rows.map((e) => e.email).join(', '),
            subject, // Subject line
            text, // plain text body
            html: text, // html body
        });

        console.log("Message sent: %s", info.messageId);


        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

module.exports = new SpamService;
