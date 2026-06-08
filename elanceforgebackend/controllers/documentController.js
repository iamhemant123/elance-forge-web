import Document from "../models/Document.js";
import Contact from "../models/Contact.js";
import Project from "../models/Project.js";

// CLIENT DROPDOWN
export const getClientsForDocuments = async (req, res) => {
  try {

    const clients = await Contact.find(
      {},
      {
        name: 1,
        email: 1,
      }
    ).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      clients,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// VERIFY CLIENT
export const verifyClient = async (req, res) => {
  try {

    const { clientEmail } = req.body;

    const client = await Contact.findOne({
      email: clientEmail.trim().toLowerCase(),
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Not Found",
      });
    }

    const projects = await Project.find({
      clientEmail: client.email,
    });

    res.status(200).json({
      success: true,
      clientName: client.name,
      clientEmail: client.email,
      projects,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// UPLOAD DOCUMENT
export const uploadDocument = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const document = await Document.create({
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      projectName: req.body.projectName,
      documentName: req.body.documentName,
      documentType: req.body.documentType,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      fileData: req.file.buffer,
    });

    res.status(201).json({
      success: true,
      document,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET ALL DOCUMENTS
export const getDocuments = async (req, res) => {
  try {

    const documents = await Document.find()
      .select("-fileData")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      documents,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// VIEW DOCUMENT
export const getDocument = async (req, res) => {
  try {

    const document = await Document.findById(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.setHeader(
      "Content-Type",
      document.mimeType
    );

    res.send(document.fileData);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// DOWNLOAD DOCUMENT
export const downloadDocument = async (req, res) => {
  try {

    const document = await Document.findById(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${document.fileName}"`
    );

    res.setHeader(
      "Content-Type",
      document.mimeType
    );

    res.send(document.fileData);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// DELETE DOCUMENT
export const deleteDocument = async (req, res) => {
  try {

    await Document.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};