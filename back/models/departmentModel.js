const mongoose = require('mongoose')


const departmentSchema = new mongoose.Schema({
    name:{type:String},
    manager:{type:String}
})

module.exports = mongoose.model('department',departmentSchema)