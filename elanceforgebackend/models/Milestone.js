import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({

projectId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Project",
required:true,
},

title:{
type:String,
required:true,
},

assignedTo:{
type:String,
default:"",
},

deadline:{
type:String,
required:true,
},

priority:{
type:String,
enum:["Low","Medium","High","Urgent"],
default:"Medium",
},

status:{
type:String,
enum:["Pending","Working","Review","Completed"],
default:"Pending",
},

progress:{
type:Number,
default:0,
},

notes:{
type:String,
default:"",
},

},{
timestamps:true,
});

const Milestone =
mongoose.models.Milestone ||
mongoose.model("Milestone", milestoneSchema);

export default Milestone;