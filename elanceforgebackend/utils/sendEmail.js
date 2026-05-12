import nodemailer from "nodemailer";

let transporter = null;

// Create Mail Transporter
const createTransporter = () => {
  if (!transporter) {
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      throw new Error(
        "Email credentials are missing"
      );
    }

    transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return transporter;
};

// Send Email Function
const sendEmail = async (
  to,
  subject,
  html
) => {
  try {
    const mailTransporter =
      createTransporter();

    const mailOptions = {
      from: `ElanceForge <${process.env.EMAIL_USER}>`,

      to: Array.isArray(to) ? to.join(",") : to,

      subject,

      html,
    };

    const info =
      await mailTransporter.sendMail(
        mailOptions
      );

    console.log(
      "Email Sent Successfully :",
      info.messageId
    );

    return info;

  } catch (error) {
    console.error(
      "sendEmail Error :",
      error.message
    );

    throw error;
  }
};

export default sendEmail;