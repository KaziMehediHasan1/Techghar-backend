import config from "@/config/index.js";
import AppError from "@/utils/appError.js";
import * as nodemailer from "nodemailer";
import { string } from "zod";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const mailOptions = {
  from: "yourmail@gmail.com",
  to: "receiver@gmail.com",
  subject: "Test Email",
  text: "Hello from Node.js 🚀",
  html: `<p>Hello Dear tester..</p>`,
};

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({
    from: "TechGhar@gmail.com",
    to,
    subject,
    html,
  });
};
