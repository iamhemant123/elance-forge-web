import Otp from "../models/Otp.js";

export const saveOtp =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      if (
        !email ||
        !otp
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Email and OTP are required",
        });

      }

      await Otp.deleteMany({
        email,
      });

      await Otp.create({
        email,
        otp,
      });

      return res.status(200).json({
        success: true,
        message:
          "OTP saved successfully",
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to save OTP",
      });

    }

  };

export const verifyOtp =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      const otpRecord =
        await Otp.findOne({
          email,
        });

      if (!otpRecord) {

        return res.status(400).json({
          success: false,
          message:
            "OTP expired",
        });

      }

      if (
        otpRecord.otp !==
        otp
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid OTP",
        });

      }

      await Otp.deleteOne({
        _id:
          otpRecord._id,
      });

      return res.status(200).json({
        success: true,
        message:
          "OTP verified successfully",
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "OTP verification failed",
      });

    }

  };