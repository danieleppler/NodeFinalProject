const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    start_work_year:{type:Number},
    departmentid:{type:Object}
})

module.exports = mongoose.model('employee',employeeSchema)