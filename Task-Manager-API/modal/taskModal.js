

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskModal = new Schema({
    task:{type:String,required:true},
    status:{type:String},
    user:{type: mongoose.Types.ObjectId,ref:"users"}
},{timestamps:true});

const Task = mongoose.model("Tasks" , taskModal)
module.exports = Task;