const departmentRepo= require('../repositories/departmentRepo')

const getAllData =async () =>{
    const data =  await departmentRepo.getallData()
    return data
}

const updateDepartment = async (dep) =>{
    const data = await departmentRepo.updateDepartment(dep)
}

const deleteDep = async (id) =>{
    try{
        await departmentRepo.deleteDep(id)
        return {
            status:"Success"
        }
    }
    catch(e){
        return {
            status:"Failure"
        }
    }
}

module.exports = {getAllData,updateDepartment,deleteDep}