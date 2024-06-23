const employeeRepo = require('../repositories/employeeRepo')
const departmentRepo = require('../repositories/departmentRepo')
const shiftRepo = require('../repositories/shiftRepo')

const getEmployeesList = async () =>{

    let employeesList = []

    const employees = await employeeRepo.getallData()
    const allShifts = await shiftRepo.getallData()

    for (let index = 0; index < employees.length; index++) {
        const department = await departmentRepo.getDepartmentById(employees[index].departmentid)
        let filteredShifts = allShifts.filter((z) =>{
           return z.employees.includes(employees[index]._id)
        })

        const userShifts = filteredShifts
        let finelEmployee= {
            _id:employees[index]._id,
            name:employees[index].first_name +" "+ employees[index].last_name,
            department :department.name ,
            shifts: userShifts,
            start_work_year : employees[index].start_work_year
        }

        employeesList.push(finelEmployee)   
    }
    return employeesList
}
const addnewEmployee = async (employee) =>{
    const data =  await employeeRepo.addnewEmployee(employee)
    return data

}

const updateEmployee = async (employee) =>{
    const { _id } = employee
    try{
        if(employee.departmentName !== employee.department){
            const {_id:depId} = await departmentRepo.getDepartmentByName(employee.departmentName)
            employee.departmentid = depId
        }
        await employeeRepo.updateEmployee(_id,employee)

        const data = await shiftRepo.getallData()
        const employeeShifts = employee.shifts.map((x)=>{return x._id})
        data.forEach((x)=>{
            if(employeeShifts.includes(x._id.toString()) && !x.employees.includes(employee._id))
                {
                    const temp  = {...x._doc,employees : [...x.employees,employee._id.toString()]}
                    console.log(shiftRepo.updateShift(temp))
                }
        })
        return {
            status:"Success"
        }
    }
    catch(e){
        console.log(e)
        return {
            status:"Failure"
        }
    }
    
}

const deleteEmployee = async (id) =>{
    try{
        await employeeRepo.deleteEmployee(id)
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

module.exports = {getEmployeesList,updateEmployee,deleteEmployee,addnewEmployee}