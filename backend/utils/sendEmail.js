require('dotenv').config();
const nodemailer = require('nodemailer');


const sendEmail = async (options) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,

            auth: {
                user: process.env.user_email,
                pass: process.env.user_password,
            },
        });

        const mailOptions = {
            from: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(`Error: ${err}`);
            } else {
                console.log(data);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail; 