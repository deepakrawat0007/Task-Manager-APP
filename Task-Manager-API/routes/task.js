const router = require("express").Router();
const Task = require("../modal/taskModal");


//get all tasks

router.get("/tasks" , async(req,res)=>{

    try{

        const tasks = await Task.find({user:req.user}).sort({_id:-1})
        return res.status(200).json({
            tasks:tasks
        })
    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})

// add new task


router.post("/Addtasks" , async(req,res)=>{

    try{

       const {task, status} = req.body

       const taskss = new Task({
        task:task,
        status:"Pending",
        user:req.user
       })
      await taskss.save()
      const tasks = await Task.find({user:req.user}).sort({_id:-1})
        return res.status(200).json({
            message:"task Added SuccessFully",
            tasks:tasks
        })
    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})

//delete tasks

router.delete("/deleteTask/:id" , async(req , res)=>{
    try{
         const _id = req.params.id

         await Task.findByIdAndDelete(_id)
         const tasks = await Task.find({user:req.user}).sort({_id:-1})
        return res.status(200).json({
            message:"task deleted SuccessFully",
            tasks:tasks
        })
    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})

//update Task Status

router.put("/updateTaskStatus/:id" , async(req , res)=>{
    const {status} = req.body
    try{
        await Task.findByIdAndUpdate({_id : req.params.id}, { $set:{'status':status}})
        
        const tasks = await Task.find({user:req.user}).sort({_id:-1})
        return res.status(200).json({
            tasks:tasks
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})

//update Task Data

router.put("/updateTask/:id" , async(req , res)=>{
    const _id = req.params.id
    const updateTask = await Task.findByIdAndUpdate(_id,req.body,
        {
        new: true,
        useFindAndModity: false
      })
      const tasks = await Task.find({user:req.user}).sort({_id:-1})
      return res.status(200).json({
          tasks:tasks
      })
})



module.exports = router;