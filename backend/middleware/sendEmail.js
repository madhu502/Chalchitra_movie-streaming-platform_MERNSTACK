import nodemailer from "nodemailer";
import { ENV_VARS } from "../config/envVars.js";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: ENV_VARS.EMAIL_SERVICE,
    auth: {
      user: ENV_VARS.EMAIL_USERNAME,
      pass: ENV_VARS.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: ENV_VARS.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
