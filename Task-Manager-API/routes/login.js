const router = require('express').Router();
const User = require("../modal/userModal")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "HelloUser"

router.post('/login'
    , async (req, res) => {
        try {
            const { email, password } = req.body; //username is phone or email

            //check user exists or not?
            const isUser = await User.findOne({ email: email })

            if (!isUser) {
                return res.status(400).json({message:"No User Exists With given Email / Phone Number"})
            } else {
                bcrypt.compare(req.body.password, isUser.password, function (err, result) { // comparing password
                    if (err) {
                        return res.status(401).json({
                            message: err.message
                        })
                    }
                    if (result) {
                        const token = jwt.sign({             //pwd crrct creating jwt
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: isUser._id
                        }, secret);

                        return res.status(200).json({
                           message:"LoggedIn Success",
                           "token":token
                        })
                    } else {
                        return res.status(401).json({
                            message:"Invalid Credentials"
                        })
                    }

                })

            }



        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    })

    module.exports = router;