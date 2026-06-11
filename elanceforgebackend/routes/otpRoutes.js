import express from "express";

import {
  saveOtp,
  verifyOtp,
} from "../controllers/otpController.js";

const router =
  express.Router();

router.post(
  "/save",
  saveOtp
);

router.post(
  "/verify",
  verifyOtp
);
router.get(
  "/test",
  (req, res) => {

    res.json({
      success: true,
      message:
        "OTP Route Working",
    });

  }
);
export default router;