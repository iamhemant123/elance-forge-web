import express from "express";
import upload from "../middleware/upload.js";

import {
  getClientsForDocuments,
  verifyClient,
  uploadDocument,
  getDocuments,
  getDocument,
  downloadDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();


// ========================================
// CLIENT DROPDOWN
// ========================================

router.get(
  "/clients",
  getClientsForDocuments
);


// ========================================
// VERIFY CLIENT
// ========================================

router.post(
  "/verify-client",
  verifyClient
);


// ========================================
// UPLOAD DOCUMENT
// ========================================

router.post(
  "/upload",
  upload.single("file"),
  uploadDocument
);


// ========================================
// GET ALL DOCUMENTS
// ========================================

router.get(
  "/",
  getDocuments
);


// ========================================
// DOWNLOAD DOCUMENT
// IMPORTANT: MUST BE ABOVE "/:id"
// ========================================

router.get(
  "/download/:id",
  downloadDocument
);


// ========================================
// VIEW DOCUMENT
// ========================================

router.get(
  "/:id",
  getDocument
);


// ========================================
// DELETE DOCUMENT
// ========================================

router.delete(
  "/:id",
  deleteDocument
);

export default router;