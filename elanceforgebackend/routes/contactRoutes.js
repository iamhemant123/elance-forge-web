import express from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";
import saveToExcel from "../utils/saveToExcel.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail().normalizeEmail(),
    body("company").optional().trim().isLength({ max: 100 }),
    body("subject").trim().isLength({ min: 3, max: 100 }),
    body("message").trim().isLength({ min: 10, max: 1000 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
        });
      }

      const { name, email, company, subject, message } = req.body;

      // 1️⃣ Save to DB
      const contact = await Contact.create({
        name,
        email,
        company,
        subject,
        message,
      });

      // 2️⃣ Admin mail (AWAIT is MUST)
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Contact Form Submission",
        `
          <h3>New Contact</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company || "N/A"}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>
        `
      );

      // 3️⃣ User confirmation mail
      await sendEmail(
        email,
        "We received your message",
        `
          <p>Hi ${name},</p>
          <p>Thank you for contacting us. Your message has been received.</p>
          <p>We will get back to you shortly.</p>
          <br />
          <p>Regards,<br />ElanceForge Team</p>
        `
      );

      // 4️⃣ Optional (non-critical)
      saveToExcel(contact).catch(() => {});

      // 5️⃣ FINAL response (AFTER mail)
      res.status(201).json({
        success: true,
        message: "Form submitted successfully",
      });
    } catch (error) {
      console.error("Contact route error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

export default router;