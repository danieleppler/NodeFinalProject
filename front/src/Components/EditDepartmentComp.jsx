import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditDepartmentComp = () => {

    const CurrentEditedDepartment = useSelector((state) => state.root.CurrentlyEdittedDepartment)
    const CurrentlyLoggedUser = useSelector((state)=> state.root.CurrentlyLoggedUser)
    const [SelectedUserToAddId,SetSelectedUserToAddId] = useState('')

    const [FormData,SetFromData] = useState()
    const [Employees,SetEmployees] =useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const DepartmentsUrl= 'http://localhost:8000/departments'
    const EmployeesUrl = 'http://localhost:8000/employees'

    useEffect(()=>{
        const fetchData = async () =>{
            const resp = await axios.get(EmployeesUrl,{headers:{
                token:CurrentlyLoggedUser.token,
                userid:CurrentlyLoggedUser.id
            }})
            if(resp.data.ErrMsg)
            {   
                navigate('/')
                alert(resp.data.ErrMsg);
            }
            const temp = resp.data.filter((x)=>x.department !== CurrentEditedDepartment.name)
            SetEmployees(temp)
        }
        fetchData()
    },[])

    useEffect(()=>{ 
        if(CurrentEditedDepartment){

            SetFromData(CurrentEditedDepartment)
        }            
    },[CurrentEditedDepartment])

    const handleSubmit =()=>{
        const res = axios.put(`${DepartmentsUrl}`,FormData,{headers:{
            token:CurrentlyLoggedUser.token,
            userid:CurrentlyLoggedUser.id
        }})

       

        dispatch({type:"Update_CurrentlyEdittedDepartment",payload:FormData})
        if(res.data.ErrMsg)
        {   
            navigate('/')
            alert(res.data.ErrMsg);
        }
        else{
            navigate('/departments')
            alert('department edited!');
        }
        
        SetSelectedUserToAddId('')
                
    }

    const handleAddEmployee = () =>{
        console.log(SelectedUserToAddId)
        let EmployeeToEdit = Employees.find((x)=>x._id === SelectedUserToAddId)
        let temp  = {
          _id:EmployeeToEdit._id,
          departmentid : CurrentEditedDepartment._id
        }

        const res2 = axios.put(EmployeesUrl,temp,{headers:{
            token:CurrentlyLoggedUser.token,
            userid:CurrentlyLoggedUser.id
        }})

        if(res2.status === "Success" )
            console.log("User added...")
    }

    const handleChange = (e) =>{
        SetFromData({...FormData,[e.target.name]:e.target.value})
    }

    const handleDelete = () =>{

    }

  return (
    <form onSubmit={handleSubmit}>
      Name : <input name="name" onChange={handleChange} defaultValue={FormData?.name}></input><br />
      Manager : <input name="manager" onChange={handleChange} defaultValue={FormData?.manager}></input><br />
      Employees to assign to this department : <select onChange={(e)=>{
                SetSelectedUserToAddId(e.target.value)
            }}>
      <option></option>{
        Employees?.map((x)=>{
            return <option key = {x._id} value={x._id}>
                {x.name}
            </option>
        })
        }</select>
        <button onClick={handleAddEmployee}>Add employee</button>
        <br />
      <button type="submit">Update</button><br />
      <button onClick={handleDelete}>delete</button>

    </form>
  )
}

export default EditDepartmentComp
