const router = require("express").Router()
const User = require("../modal/userModal");
const bcrypt = require("bcrypt");

router.post("/register" , async(req,res)=>{
    try{
        const {firstName , lastName , email , phone , country , occupation ,image , password} = req.body

        const isUser = await User.findOne({email:email})
        const issUser = await User.findOne({phone:phone})

        if(isUser || issUser){
            return res.status(400).json({
                message:"User Already Exist with given mail-id or PhoneNo."
            })
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    "Error": err.message
                })
            } else {

                const user = new User({
                    firstName :firstName,
                    lastName : lastName,
                    country:country,
                    phone:phone,
                    occupation:occupation,
                    image:!image?"https://cdn.onlinewebfonts.com/svg/img_569204.png":image,
                    email: email,
                    password: hash
                });
                user.save().then(() => {
                    return res.status(200).json({
                        "user": user
                    })
                })
            }
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})

module.exports = router