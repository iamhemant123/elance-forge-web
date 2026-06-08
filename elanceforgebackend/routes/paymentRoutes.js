import express from "express";

import {
  createOrder,
  verifyPayment,
  getAllPayments,
  getClientPayments,
  deletePayment,
  addManualPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post(
  "/create-order",
  createOrder
);

router.post(
  "/verify",
  verifyPayment
);

router.post(
  "/manual",
  addManualPayment
);

router.get(
  "/",
  getAllPayments
);

router.get(
  "/client/:email",
  getClientPayments
);

router.delete(
  "/:id",
  deletePayment
);

export default router;