import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "localhost",
  port: process.env.SMTP_PORT ?? 1025,
  secure: false
});
