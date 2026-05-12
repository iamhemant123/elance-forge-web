import express from "express";
import { body, validationResult } from "express-validator";

import Contact from "../models/Contact.js";

import sendEmail from "../utils/sendEmail.js";
import saveToExcel from "../utils/saveToExcel.js";
import sendWhatsAppMessage from "../utils/sendWhatsAppMessage.js";

const router = express.Router();

router.post(
  "/contact",

  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name is too short"),

    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address"),

    body("company")
      .optional()
      .trim()
      .isLength({ max: 100 }),

    body("subject")
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Invalid subject"),

    body("message")
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Message is too short"),
  ],

  async (req, res) => {
    try {
      // Validate Request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: errors.array(),
        });
      }

      const {
        name,
        email,
        company,
        subject,
        message,
      } = req.body;

      // Save Lead
      const newLead = await Contact.create({
        name,
        email,
        company,
        subject,
        message,
        ipAddress:
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress ||
          "",
      });

      // Admin Email
      await sendEmail(
        process.env.ADMIN_EMAIL,
        `New Client Inquiry - ${subject}`,

        `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Contact Inquiry</h2>

            <p><strong>Name :</strong> ${name}</p>

            <p><strong>Email :</strong> ${email}</p>

            <p><strong>Company :</strong> ${
              company || "Not Provided"
            }</p>

            <p><strong>Subject :</strong> ${subject}</p>

            <p><strong>Message :</strong></p>

            <p>${message}</p>
          </div>
        `
      );

      // Client Confirmation Email
      await sendEmail(
        email,
        "We Received Your Message - ElanceForge",

        `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hello ${name},</h2>

            <p>
              Thank you for contacting <strong>ElanceForge</strong>.
            </p>

            <p>
              We have successfully received your message.
              Our team will contact you shortly.
            </p>

            <br />

            <p>
              Regards,
              <br />
              <strong>ElanceForge Team</strong>
            </p>
          </div>
        `
      );

      // WhatsApp Notification
      await sendWhatsAppMessage(
        `
New Lead Received

Name : ${name}

Email : ${email}

Company : ${company || "N/A"}

Subject : ${subject}
        `
      );

      // Save To Excel (Optional)
      saveToExcel(newLead).catch(() => {});

      // Success Response
      return res.status(201).json({
        success: true,
        message: "Message submitted successfully",
      });

    } catch (error) {
      console.error(
        "Contact Form Error :",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export default router;