import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditEmployeeComp = () => {

    let EmployeeToEdit = useSelector((state) => {
        return state.root.CurrentlyEdittedEmployee
    }
)
    

    const [Departments,SetDepartments] = useState([])
    const [AllShifts,SetAllShifts] = useState()
    
    const [UpdatedData,SetUpdatedData] = useState({...EmployeeToEdit,departmentName:""})

    const CurrentlyLoggedUser = useSelector((state)=>state.root.CurrentlyLoggedUser)

    const allShiftsFromStore = useSelector((state)=>state.root.CurrentAllShifts)

    const navigate = useNavigate()
    
    const DepartmentsUrl= 'http://localhost:8000/departments'
    const shiftsUrl = 'http://localhost:8000/shifts'
    const employeesUrl = 'http://localhost:8000/employees'

    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchData =async () =>{
            
            let resp1 = await axios.get(shiftsUrl,{headers:{'token':CurrentlyLoggedUser.token,"userid":CurrentlyLoggedUser.id}})
            if(resp1.data.ErrMsg)
            {   
                navigate('/')
                alert(resp1.data.ErrMsg);
            }

            shifts = resp1.data.filter((x)=> EmployeeToEdit.shifts.filter((z)=>{z._id !== x._id}))
            SetAllShifts(shifts)


            const resp2 = await axios.get(DepartmentsUrl,{headers:{"userid":CurrentlyLoggedUser.id,'token':CurrentlyLoggedUser.token}})
            if(resp2.data.ErrMsg)
            {   
                navigate('/')
                alert(resp2.data.ErrMsg);
            }

            SetDepartments(resp2.data)

        }
        fetchData()
    },[])


    function handleSubmit(){
    
        const res = axios.put(`${employeesUrl}`,UpdatedData,{headers:{
            token:CurrentlyLoggedUser.token
        }})
        dispatch({type:"Update_CurrentlyEdittedEmployee",payload:UpdatedData})
        if(res.data.ErrMsg)
        {   
            navigate('/')
            alert(res.data.ErrMsg);
        }
        else{
            navigate('/employees')
            alert('employee edited!');
        }
        }   

    useEffect(()=>{
        if(allShiftsFromStore)
            SetAllShifts(allShiftsFromStore)
    },[allShiftsFromStore])

  
    useEffect(()=>{
        if(Departments)
            Departments?.forEach((x)=>{
                if(x._id === EmployeeToEdit.department)
                    SetUpdatedData({...UpdatedData,departmentName:x.name})
              })
    },[Departments])

    const handleChange = (e) =>{
        SetUpdatedData({...UpdatedData,[e.target.name]:e.target.value})
    }

    const AssignShift = (shift) => {
        let tempUserShift = EmployeeToEdit.shifts
        let ShiftToAdd = AllShifts.findIndex((x)=>x._id === shift._id)
    
        tempUserShift = [...tempUserShift,AllShifts[ShiftToAdd]]

        EmployeeToEdit = {...EmployeeToEdit,shifts:tempUserShift}

        dispatch({type:'Update_CurrentlyEdittedEmployee',payload:EmployeeToEdit}) 
        
        let tempAllShifts = AllShifts.filter((x)=>x._id !== shift._id)

        dispatch({type:'Update_CurrentAllShifts',payload:tempAllShifts})
        SetUpdatedData({...UpdatedData,shifts:EmployeeToEdit.shifts})
    }

    const handleDelete = () =>{
        const res = axios.delete(`${employeesUrl}`,EmployeeToEdit._id,{headers:{
            token:CurrentlyLoggedUser.token,
            userid:CurrentlyLoggedUser.id
        }})
        if(res.status === "Success")
            console.log("user deleted...")
        navigate('/employees')
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        First Name : <input name = "first_name" onChange = {handleChange} defaultValue={EmployeeToEdit?.name.split(' ')[0]}></input><br />
        Last Name : <input name = "last_name" onChange = {handleChange} defaultValue={EmployeeToEdit?.name.split(' ')[1]}></input><br />
        Start Work Year : <input name = "start_work_year" onChange = {handleChange} defaultValue={EmployeeToEdit?.start_work_year}></input><br />
        Department : <select name = "departmentName" onChange = {handleChange} >
        {
             Departments?.map((x)=>{
                return x.name === EmployeeToEdit.department?<option selected="selected" name={x.name}>{x.name}</option>:<option name={x.name}>{x.name}</option>
              })
        }
        </select><br />
        Current Shifts : <br />
        <table border={1}>
            <thead>
                <tr>
                    <th>date</th>
                    <th>hours</th>
                </tr>
            </thead>
            <tbody>
                {
                    EmployeeToEdit.shifts.map((x)=>{
                        return <tr>
                            <td>{(new Date(x.date).toLocaleDateString())}</td>
                            <td>{x.starting_hour +"-"+ x.ending_hour}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        
        Available Shifts : 
        <table>
            <thead>
                <tr>
                <th>date</th>
                <th>hours</th>
                </tr>
            </thead>
            <tbody>
            {
                    AllShifts?.map((x)=>{
                       return  EmployeeToEdit.shifts.map((z)=>{return z._id}).includes(x._id)?
                        <></> :<tr>
                            <td>{(new Date(x.date).toLocaleDateString())}</td>
                            <td>{x.starting_hour +"-"+ x.ending_hour}</td>
                            <td onClick={()=>{AssignShift(x)}}>Assign To Shift</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <button type="submit">Update</button>
        <button style={{color:"red"}} onClick={handleDelete}>Delete Employee</button>
    </form>
    </div>
  )
}

export default EditEmployeeComp
