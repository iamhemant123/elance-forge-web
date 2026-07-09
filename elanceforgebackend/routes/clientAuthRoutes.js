import express from "express";
import Contact from "../models/Contact.js";
import Document from "../models/Document.js";

const router = express.Router();
console.log("Client Auth Routes Loaded");
// CLIENT LOGIN

router.post("/login", async (req, res) => {
  try {

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    const client = await Contact.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const dbName =
      client.name.trim().toLowerCase();

    const loginName =
      name.trim().toLowerCase();

    if (dbName !== loginName) {
      return res.status(401).json({
        success: false,
        message: "Invalid Name or Email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        company: client.company || "",
        subject: client.subject || "",
      },
    });

  } catch (error) {

    console.error(
      "Client Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});


// CLIENT DOCUMENTS


router.get(
  "/documents/:email",
  async (req, res) => {
    try {

      const documents =
        await Document.find({
          clientEmail:
            req.params.email,
        })
          .select("-fileData")
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        documents,
      });

    } catch (error) {

      console.error(
        "Documents Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  }
);

export default router;