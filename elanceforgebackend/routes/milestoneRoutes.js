import express from "express";
import Milestone from "../models/Milestone.js";
import Project from "../models/Project.js";

const router = express.Router();


// GET ALL MILESTONES
router.get("/", async (req, res) => {
  try {

    const milestones = await Milestone.find()
      .populate("projectId")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      milestones,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Fetch Milestones",
    });

  }
});


// GET CLIENT MILESTONES
router.get("/client/:email", async (req, res) => {
  try {

    const milestones = await Milestone.find({
      clientEmail: req.params.email
        .trim()
        .toLowerCase(),
    })
      .populate("projectId")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(milestones);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed To Fetch Client Milestones",
    });

  }
});


// CREATE MILESTONE

router.post("/", async (req, res) => {
  try {

    const project =
      await Project.findById(
        req.body.projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    const milestone =
      await Milestone.create({
        projectId:
          req.body.projectId,

        title:
          req.body.title,

        assignedTo:
          req.body.assignedTo,

        deadline:
          req.body.deadline,

        priority:
          req.body.priority,

        notes:
          req.body.notes,

        status:
          req.body.status ||
          "Pending",

        progress:
          req.body.progress ||
          0,

        // Auto client email from project
        clientEmail:
          project.clientEmail,
      });

    const populatedMilestone =
      await milestone.populate(
        "projectId"
      );

    res.status(201).json({
      success: true,
      milestone:
        populatedMilestone,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
});

// DELETE MILESTONE
router.delete("/:id", async (req, res) => {
  try {

    await Milestone.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Milestone Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete Failed",
    });

  }
});


// UPDATE STATUS & PROGRESS
router.put("/status/:id", async (req, res) => {
  try {

    const {
      status,
      progress,
    } = req.body;

    const updatedMilestone =
      await Milestone.findByIdAndUpdate(
        req.params.id,
        {
          status,
          progress,
        },
        {
          new: true,
        }
      ).populate("projectId");

    res.status(200).json({
      success: true,
      milestone:
        updatedMilestone,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Update Failed",
    });

  }
});

export default router;