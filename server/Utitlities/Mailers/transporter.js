const nodemailer = require("nodemailer");

const sendMail = async (to, subject, message) => {
  //create a transporter here to send
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      pass: process.env.SENDGRID_PASSWORD,
      user: process.env.SENDGRID_USERNAME,
    },
  });

  //define mailOptions here to send
  const mailOptions = {
    from: `"Pet Life" <${process.env.BUSINESS_MAIL}>`,
    to: to,
    subject: subject,
    html: message,
    text: message,
  };

  const sentMail = await transporter.sendMail(mailOptions);
  return sentMail;
};

module.exports = sendMail;
