import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewEmployeeComp = () => {
    const CurrentlyLoggedUser = useSelector((state)=>state.root.CurrentlyLoggedUser)
    const [Departments,SetDepartments] = useState()
    const [FormData,SetFormData] = useState()

    const DepartmentsUrl= 'http://localhost:8000/departments'
    const EmployeesUrl= 'http://localhost:8000/employees'

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () =>{
            const resp = await axios.get(DepartmentsUrl,{headers:{'token':CurrentlyLoggedUser.token,"userid":CurrentlyLoggedUser.id}})
            if(resp.data.ErrMsg)
            {   
            navigate('/')
            alert(resp.data.ErrMsg);
            }
            SetDepartments(resp.data.departments)
        }
        fetchData()
        
    },[])

    const handleChange = (e) =>{
        SetFormData({...FormData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async () =>{
        const depId = convertDepNameToId(FormData.departmentid)
        FormData.departmentid = depId
        const resp = await axios.post(EmployeesUrl,FormData,{headers:{'token':CurrentlyLoggedUser.token,"userid":CurrentlyLoggedUser.id}})
        if(resp.data.ErrMsg)
        {   
            navigate('/')
            alert(resp1.data.ErrMsg);
        }
        else{
            navigate('/employees')
            alert('employee added!');
        }
    }

    const convertDepNameToId = (name)=>{
        const id = Departments.find((x)=>x.name === name)._id 
        return id
    }

  return (
    <form onSubmit={handleSubmit}>
      first name : <input name ="first_name" onChange={handleChange}></input><br />
      last name : <input name ="last_name" onChange={handleChange}></input><br />
      start work year : <input name="start_work_year" onChange={handleChange}></input><br />
      department : <select name="departmentid" onChange={handleChange}>{
        Departments?.map((x)=>{
            return <option name={x.name}>{x.name}</option>
        })
        }</select><br />
        <button type="submit">Add</button>
    
    </form>
  )
}

export default NewEmployeeComp
