
const departmentModel = require('../models/departmentModel')

const getallData = () =>{
    return departmentModel.find({})
}

const getDepartmentById = (id) =>{
    return departmentModel.findOne({_id:id})
}

const getDepartmentByName = (name) =>{
    return departmentModel.findOne({name:name})
}

const updateDepartment = (dep) =>{
    return departmentModel.findByIdAndUpdate(dep._id,dep)
}

const deleteDep = (id)=>{
    return departmentModel.findByIdAndDelete(id)
}
module.exports = {getallData,getDepartmentById,getDepartmentByName,updateDepartment,deleteDep}