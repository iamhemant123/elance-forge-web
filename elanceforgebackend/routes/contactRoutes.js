import express from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";
import saveToExcel from "../utils/saveToExcel.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name too short"),
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("company").optional().trim().isLength({ max: 100 }),
    body("subject")
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Invalid subject"),
    body("message")
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Message too short"),
  ],
  async (req, res) => {
    try {
      // 🔍 Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: errors.array(),
        });
      }

      const { name, email, company, subject, message } = req.body;

      // 💾 Save to Database
      const contact = await Contact.create({
        name,
        email,
        company,
        subject,
        message,
      });

      // 📩 ADMIN EMAIL
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Contact Form Submission",
        `
          <h2>📩 New Contact Enquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company || "N/A"}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `
      );

      // 📧 USER CONFIRMATION EMAIL
      await sendEmail(
        email,
        "We received your message – ElanceForge",
        `
          <p>Hi <b>${name}</b>,</p>

          <p>Thank you for contacting <b>ElanceForge</b>.</p>
          <p>We have received your message and our team will get back to you shortly.</p>

          <br />
          <p>Best regards,</p>
          <p><b>ElanceForge Team</b></p>
        `
      );

      // 📊 Optional Excel Save (Non-blocking)
      saveToExcel(contact).catch(() => {});

      // ✅ Final Response
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