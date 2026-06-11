import express from "express";
import { body, validationResult } from "express-validator";

import Contact from "../models/Contact.js";

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


                  // INSTANT RESPONSE TO FRONTEND

                  res.status(201).json({
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