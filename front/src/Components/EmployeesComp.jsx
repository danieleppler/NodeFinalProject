import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const EmployeesComp = () => {

  const EmployeesUrl = 'http://localhost:8000/employees'
  const DepartmentsUrl = 'http://localhost:8000/departments'

  const [Employees,SetEmployees] = useState([])
  const [Departments,SetDepartments] = useState([])

  const [SelectedDepartment,SetSelectedDepartment] = useState()
  
  const CurrentlyLoggedUser = useSelector((state)=>state.root.CurrentlyLoggedUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchData = async () =>{

  
        const resp1 = await axios.get(EmployeesUrl,{headers:{'userid':CurrentlyLoggedUser.id,'token':CurrentlyLoggedUser.token}})
      
        if(resp1.data.ErrMsg){
          navigate('/')
          alert(resp1.data.ErrMsg);
        }
          SetEmployees(resp1.data)
        
        
  
        const resp2 = await axios.get(DepartmentsUrl,{headers:{'userid':CurrentlyLoggedUser.id,'token':CurrentlyLoggedUser.token}})
        if(resp1.data.ErrMsg){
          navigate('/')
          alert(resp1.data.ErrMsg);
        }
        SetDepartments(resp2.data)
  
    }
    fetchData()
  },[])

  

  return (
    <div>
      <select onChange={(e)=>SetSelectedDepartment(Departments.find((x)=>x.name === e.target.value))}>
        <option name=""></option>
      
        {
          Departments?.map((x)=>{
            return <option name={x.name}>{x.name}</option>
          })
        }
      </select>
      <table border={1} style={{padding:"10px"}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Shifts</th>
        </tr>
      </thead>
      <tbody>
        {

          Employees.filter((x)=>SelectedDepartment?x.department === SelectedDepartment.name:1).map((x)=>{
            return <tr>
              <td onClick={()=>{
                dispatch({type:"Update_CurrentlyEdittedEmployee",payload:x})
                navigate('/employees/edit')
              }}>{x.name}</td>
              <td>{x.department}</td>
              <td>
                <ul>
                  {x.shifts.map((z)=>{
                    return <div >
                      Date : {(new Date(z.date).toLocaleDateString())}  
                      &nbsp; {z.starting_hour+"-"+z.ending_hour}
                    </div>
                  })}
                </ul>
              </td>
            </tr>
          })
        }
      </tbody>
      </table>
      <button onClick={()=>{
        navigate('/employees/addnew')
      }}>New Employee</button>
    </div>
  )
}

export default EmployeesComp
