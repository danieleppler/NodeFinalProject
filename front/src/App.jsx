import React from 'react'
import EmployeesComp from './Components/EmployeesComp'
import EditEmployeeComp from './Components/EditEmployeeComp'
import MainViewComp from './Components/MainViewComp'
import LoginComp from './Components/LoginComp'
import { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import NewEmployeeComp from './Components/NewEmployeeComp'
import DepartmentsComp from './Components/DepartmentsComp'
import EditDepartmentComp from './Components/EditDepartmentComp'


const App = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
if(sessionStorage.getItem("FirstRun") === null)
    {
      dispatch({type:"RESET_STORE"})
      sessionStorage.setItem("FirstRun",false)
    }
  },[])

  return (
    <div>
      <Routes>
      <Route path="/" element={<LoginComp />} />
      <Route path="/index" element = {<MainViewComp />}/>
      <Route path="/employees" element= {<EmployeesComp />} />
      <Route path="/employees/edit" element= {<EditEmployeeComp />} />
      <Route path="/employees/addnew" element={<NewEmployeeComp />} ></Route>
      <Route path="/departments" element={<DepartmentsComp />} />
      <Route path="/departments/edit" element={<EditDepartmentComp />}/>
    </Routes>
    </div>
  )
}


export default App
