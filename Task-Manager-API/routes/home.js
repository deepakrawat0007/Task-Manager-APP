const router = require("express").Router()
const User = require("../modal/userModal");

router.get("/user" , async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.user})
        return res.status(200).json({
            user:user
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})

//update Image

router.put("/updateProfilePic" , async(req , res)=>{

    const UpdateImage = await User.findByIdAndUpdate(req.user,{ $set:{'image': req.body.image}},
        {
        new: true,
        useFindAndModity: false
      })
      return res.status(200).json({
        message:"Profile Image Updated SuccessFully",
        image:req.body.image
      })
     
})
module.exports = router