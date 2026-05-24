import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();



// GET CONTACTS

router.get("/contacts", async (req, res) => {

  try {

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      contacts,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
});



// DELETE CONTACT

router.delete("/contacts/:id", async (req, res) => {

  try {

    await Contact.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Client Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Delete Failed",
    });
  }
});



// UPDATE STATUS

router.put("/contacts/status/:id", async (req, res) => {

  try {

    const updated = await Contact.findByIdAndUpdate(

      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      updated,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Status Update Failed",
    });
  }
});



export default router;