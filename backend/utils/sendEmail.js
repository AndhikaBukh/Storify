require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ErrorResponse = require('../utils/errorResponse');

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SCERET,
    process.env.CLIENT_REDIRECTURL
);
oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const sendEmail = async (options) => {
    try {

        const accessToken = process.env.ACCESS_TOKEN;


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SCERET,
                refreshToken: process.env.REFRESH_TOKEN,
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