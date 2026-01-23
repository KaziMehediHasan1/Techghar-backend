import config from "@/config/index.js";
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
};

transporter.sendMail(mailOptions, (error, info) => {
    
});
