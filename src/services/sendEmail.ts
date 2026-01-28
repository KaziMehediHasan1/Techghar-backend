import config from "@/config/index.js";
import AppError from "@/utils/appError.js";
import * as nodemailer from "nodemailer";
import { string } from "zod";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

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
