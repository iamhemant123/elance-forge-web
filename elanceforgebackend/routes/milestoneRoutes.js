import express from "express";

import Milestone from "../models/Milestone.js";

const router = express.Router();


// ================= GET ALL =================

router.get("/", async (req, res) => {

try {

const milestones = await Milestone.find()
.populate("projectId")
.sort({ createdAt: -1 });

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


// ================= CREATE =================

router.post("/", async (req, res) => {

try {

const milestone = await Milestone.create(req.body);

const populatedMilestone = await milestone.populate("projectId");

res.status(201).json({
success: true,
milestone: populatedMilestone,
});

} catch (error) {

console.log(error);

res.status(500).json({
success: false,
message: "Failed To Create Milestone",
});

}

});


// ================= DELETE =================

router.delete("/:id", async (req, res) => {

try {

await Milestone.findByIdAndDelete(req.params.id);

res.status(200).json({
success: true,
message: "Milestone Deleted Successfully",
});

} catch (error) {

console.log(error);

res.status(500).json({
success: false,
message: "Delete Failed",
});

}

});


// ================= UPDATE STATUS =================

router.put("/status/:id", async (req, res) => {

try {

const { status, progress } = req.body;

const updatedMilestone = await Milestone.findByIdAndUpdate(
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
milestone: updatedMilestone,
});

} catch (error) {

console.log(error);

res.status(500).json({
success: false,
message: "Update Failed",
});

}

});

export default router;