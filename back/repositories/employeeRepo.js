const employeeModel = require('../models/employeeModel')

const getallData = () =>{
    return employeeModel.find({})
}

const updateEmployee = (id,employee)=>{
     return employeeModel.findByIdAndUpdate(id,employee)
}

const deleteEmployee = (id)=>{
    return employeeModel.findByIdAndDelete(id)
}

const addnewEmployee = (employee)=>{
    let newEmployee = new employeeModel(employee)
    newEmployee.save()
    return {status:"Success",message:"Added"}
}



module.exports = {getallData,updateEmployee,deleteEmployee,addnewEmployee}
