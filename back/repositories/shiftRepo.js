
const shiftModel = require('../models/shiftModel')

const getallData = () =>{
    return shiftModel.find({})
}


const getEmployeeShifts = (employee) => {
    return shiftModel.find({employees :{ $in: employee }})
}

const updateShift = (shift) =>{
    return shiftModel.findByIdAndUpdate(shift._id,shift,  { strict: true })
}

module.exports = {getallData,getEmployeeShifts,updateShift}