import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DepartmentsComp = () => {

    const CurrentlyLoggedUser = useSelector((state)=>state.root.CurrentlyLoggedUser)

    const DepartmentsUrl= 'http://localhost:8000/departments'
    const employeesUrl = 'http://localhost:8000/employees'
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [Departments,SetDepartments] = useState()
    const [Employees,SetEmployees] =useState()

    useEffect(()=>{
        const fetchData =async () =>{
            
            let resp1 = await axios.get(employeesUrl,{headers:{'token':CurrentlyLoggedUser.token,"userid":CurrentlyLoggedUser.id}})
            if(resp1.data.ErrMsg)
            {   
                navigate('/')
                alert(resp1.data.ErrMsg);
            }
            SetEmployees(resp1.data)

            const resp2 = await axios.get(DepartmentsUrl,{headers:{'token':CurrentlyLoggedUser.token,"userid":CurrentlyLoggedUser.id}})
            if(resp2.data.ErrMsg)
                {   
                    navigate('/')
                    alert(resp2.data.ErrMsg);
                }
            SetDepartments(resp2.data)
        }
        fetchData()
    },[])


  return (
    <table border={1}>
        <thead>
            <tr>
                <th>Department Name</th>
                <th>Manager</th>
                <th>Current Employees</th>
            </tr>
        </thead>
        <tbody>
            {
                Departments?.map((x)=>{
                    let currentEmployeesByName = Employees.filter((z)=>z.department === x.name)
                    return <tr>
                        <td onClick={()=>{
                             dispatch({type:"Update_CurrentlyEdittedDepartment",payload:x})
                             navigate('/departments/edit')
                        }}>{x.name}</td>
                        <td>{x.manager}</td>
                        <td>
                            <ul>
                                {
                                    currentEmployeesByName.map((z)=>{
                                        return <li onClick={()=>{
                                            dispatch({type:"Update_CurrentlyEdittedEmployee",payload:z})
                                            navigate('/employees/edit')
                                        }}>{z.name}</li>
                                    })
                                }
                            </ul>
                            </td>
                    </tr>
                })
            }
        </tbody>
     
     </table>
  )
}

export default DepartmentsComp
