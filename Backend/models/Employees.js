const mongoose = require("mongoose")

const RegisterSchema = new mongoose.Schema({
    username : String,
    email : String,
    password: String,
})

const RegisterModel = mongoose.model("employees", RegisterSchema)

module.exports = RegisterModel;