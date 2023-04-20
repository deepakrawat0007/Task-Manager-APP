const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const Auth = require("./middleware/autherization");
const register = require("./routes/register")
const login = require("./routes/login")
const getUser = require("./routes/home")
const Task = require("./routes/task")
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/" , register);
app.use("/" , login);
app.use("/" , Auth , getUser)
app.use("/" , Auth , Task)

app.get('/',(req,res)=>{
    res.status(200).json({
        "Message":"Server is OK"
    })
})

module.exports = app