const mongoose = require('mongoose')


const shiftSchema = new mongoose.Schema({
    date:{type:String},
    starting_hour:{type:Number},
    ending_hour:{type:Number},
    employees:{type:[]}
})

module.exports = mongoose.model('shift',shiftSchema)