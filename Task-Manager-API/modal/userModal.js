const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserModal = new Schema({
    firstName :{type:String , required:true},
    lastName :{type:String , required:true},
    email:{type:String , unique:true , required:true},
    phone:{type:Number , unique:true , required:true},
    country:{type:String , required:true},
    occupation:{type:String,required:true},
    image:{type:String },
    password:{type:String , required:true}
},{timestamps:true})

const User = mongoose.model("Users" , UserModal)
module.exports = User;