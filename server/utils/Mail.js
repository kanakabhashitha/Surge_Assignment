import nodemailer from "nodemailer";

const generateOtp = () => {
  let OTP = "";
  for (let i = 0; i < 5; i++) {
    const randomValue = Math.round(Math.random() * 9);
    OTP += randomValue;
  }
  return OTP;
};

const mailTransport = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    // service: "gmail",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER_NAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

export { generateOtp, mailTransport };
