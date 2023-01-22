const nodemailer = require('nodemailer');
const env = require('dotenv').config();
// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(subject, html, email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.TRANSPORT_HOST,
    port: process.env.TRANSPORT_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.TRANSPORT_USER, // generated ethereal user
      pass: process.env.TRANSPORT_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Medlair Newsletter" <newsletter@medlair.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

// main().catch(console.error);
