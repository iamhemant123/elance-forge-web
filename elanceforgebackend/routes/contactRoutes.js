const express = require("express");
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");
const saveToExcel = require("../utils/saveToExcel");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/",[
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail().normalizeEmail(),
    body("company").optional().trim().isLength({ max: 100 }),
    body("subject").trim().isLength({ min: 3, max: 100 }),
    body("message").trim().isLength({ min: 10, max: 1000 }),
  ],
  async (req, res) => {
    try {
      /* validation check */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }

      const { name, email, company, subject, message } = req.body;

      // database save (await for error catch)
      const savedData = await Contact.create({
        name,
        email,
        company,
        subject,
        message,
      });

      // immediate response to client
      res.status(201).json({
        success: true,
        message: "Form submitted successfully",
      });

      // background tasks 
      try {
        saveToExcel(savedData);

        await sendEmail(
          process.env.ADMIN_EMAIL,
          "New Contact Form Entry",
          `
          <h3>New Contact</h3>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Company: ${company || "N/A"}</p>
          <p>Subject: ${subject}</p>
          <p>Message: ${message}</p>
        `
        );

        await sendEmail(
          email,
          "We received your message",
          `
          <p>Hi ${name},</p>
          <p>Thank you for reaching out. We have received your message.</p>
          <p>Our team will get back to you shortly.</p>
          <br />
          <p>Best regards,<br />ElanceForge Team</p>
        `
        );
      } catch (bgErr) {
        console.error("Background task error:", bgErr.message);
      }

    } catch (err) {
      console.error("Contact error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
