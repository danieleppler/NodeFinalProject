const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    full_name:{type:String},
    id:{type:Number}
})

module.exports = mongoose.model("user",UserSchema)