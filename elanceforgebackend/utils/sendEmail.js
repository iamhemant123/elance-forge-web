// utils/sendEmail.js
import { Resend } from "resend";

// Create Resend client once
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    // 🔐 Safety check
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY missing in environment variables");
    }

    // 📤 Send email using Resend API (HTTPS)
    const { error } = await resend.emails.send({
      from: "ElanceForge <onboarding@resend.dev>", // SAFE default sender
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error("Email sending failed via Resend");
    }

    console.log("✅ Email sent successfully via Resend");
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error; // IMPORTANT → route ko pata chale
  }
};

export default sendEmail;