import express from "express";
import Project from "../models/Project.js";

const router=express.Router();

const getProgress=(status)=>{

if(status==="Pending") return 0;
if(status==="In Progress") return 30;
if(status==="Review") return 75;
if(status==="Completed") return 100;

return 0;

};

router.get("/",async(req,res)=>{

try{

const projects=await Project.find().sort({
createdAt:-1,
});

res.json({
success:true,
projects,
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
});

}

});

router.post("/",async(req,res)=>{

try{

const progress=getProgress(req.body.status);

const project=await Project.create({
...req.body,
progress,
});

res.status(201).json({
success:true,
project,
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
});

}

});

router.delete("/:id",async(req,res)=>{

try{

await Project.findByIdAndDelete(req.params.id);

res.json({
success:true,
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
});

}

});

router.put("/status/:id",async(req,res)=>{

try{

const progress=getProgress(req.body.status);

const updated=await Project.findByIdAndUpdate(

req.params.id,

{
status:req.body.status,
progress,
},

{
new:true,
}

);

res.json({
success:true,
updated,
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
});

}

});

export default router;