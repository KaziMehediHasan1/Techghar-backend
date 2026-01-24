import config from "@/config/index.js";
import AppError from "@/utils/appError.js";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "email",
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

transporter.sendMail(mailOptions, async (error, info) => {
  if (error) {
    throw new AppError(404, error.message);
  }
});
