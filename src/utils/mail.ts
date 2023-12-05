import * as nodemailer from "nodemailer";
import env from "./validateEnv";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.NODE_ENV === 'development',
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (config: {
  email: string;
  subject: string;
  message: string;
}) => {
  await transporter.sendMail({
    from: "Edgar 👻shop-co>",
    to: config.email,
    subject: config.subject,
    text: config.message,
    //html: "<b>Hello world?</b>", // html body
  });
};
