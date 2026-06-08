import Payment from "../models/Payment.js";
import Project from "../models/Project.js";
import razorpay from "../config/razorpay.js";

// CREATE RAZORPAY ORDER

export const createOrder = async (req, res) => {
  try {
    const {
      amount,
      projectId,
      projectName,
      clientName,
      clientEmail,
    } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(
      options
    );

    const payment = await Payment.create({
      projectId,
      projectName,
      clientName,
      clientEmail,
      amount,
      method: "Online",
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      order,
      payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// VERIFY ONLINE PAYMENT

export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
    } = req.body;

    const payment =
      await Payment.findOne({
        razorpayOrderId:
          razorpay_order_id,
      });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message:
          "Payment not found",
      });
    }

    // Double Verify Protection

    if (payment.status === "Paid") {
      return res.json({
        success: true,
        message:
          "Payment already verified",
      });
    }

    payment.razorpayPaymentId =
      razorpay_payment_id;

    payment.status = "Paid";

    payment.paidAt = new Date();

    await payment.save();

    // UPDATE PROJECT

    const project =
      await Project.findById(
        payment.projectId
      );

    if (project) {
      project.paidAmount =
        Number(
          project.paidAmount || 0
        ) +
        Number(payment.amount);

      project.remainingAmount =
        Number(project.budget || 0) -
        Number(
          project.paidAmount
        );

      if (
        project.remainingAmount < 0
      ) {
        project.remainingAmount = 0;
      }

      await project.save();
    }

    res.json({
      success: true,
      message:
        "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD MANUAL PAYMENT

export const addManualPayment =
  async (req, res) => {
    try {
      const {
        projectId,
        clientEmail,
        amount,
        method,
        notes,
      } = req.body;

      const project =
        await Project.findById(
          projectId
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      const payment =
        await Payment.create({
          projectId,

          projectName:
            project.projectName,

          clientName:
            project.clientName,

          clientEmail,

          amount,

          method,

          notes,

          status: "Paid",

          razorpayOrderId:
            "MANUAL",

          razorpayPaymentId:
            `MANUAL_${Date.now()}`,

          paidAt: new Date(),
        });

      project.paidAmount =
        Number(
          project.paidAmount || 0
        ) + Number(amount);

      project.remainingAmount =
        Number(project.budget || 0) -
        Number(
          project.paidAmount
        );

      if (
        project.remainingAmount < 0
      ) {
        project.remainingAmount = 0;
      }

      await project.save();

      res.json({
        success: true,
        payment,
        project,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET ALL PAYMENTS

export const getAllPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find().sort({
          createdAt: -1,
        });

      res.json(payments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET CLIENT PAYMENTS

export const getClientPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find({
          clientEmail:
            req.params.email,
        }).sort({
          createdAt: -1,
        });

      res.json(payments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE PAYMENT

export const deletePayment =
  async (req, res) => {
    try {
      await Payment.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Payment deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };