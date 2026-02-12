import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials missing in environment variables");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      family:4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // Verify SMTP (IMPORTANT for Render)
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"ElanceForge" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(" Email sent:", info.messageId);
  } catch (error) {
    console.error(" Email send failed:", error.message);
    throw error; // VERY IMPORTANT
  }
};

export default sendEmail;