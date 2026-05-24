import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({

projectName:{
type:String,
required:true,
},

clientName:{
type:String,
required:true,
},

description:{
type:String,
required:true,
},

deadline:{
type:String,
required:true,
},

status:{
type:String,
default:"Pending",
enum:["Pending","In Progress","Review","Completed"],
},

priority:{
type:String,
default:"Medium",
enum:["Low","Medium","High","Urgent"],
},

progress:{
type:Number,
default:0,
},

notes:{
type:String,
default:"",
},

team:{
type:String,
default:"",
},

},{
timestamps:true,
});

const Project=mongoose.models.Project || mongoose.model("Project",projectSchema);

export default Project;