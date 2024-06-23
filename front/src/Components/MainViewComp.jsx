import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EmployeesComp from './EmployeesComp'

const MainViewComp = () => {

    const CurrentlyLoggedUser = useSelector((state) => state?.root.CurrentlyLoggedUser)


  return (
    <div>
      {console.log(CurrentlyLoggedUser)}
        <Link to="/">Log out</Link>
        <h2>Welcome {CurrentlyLoggedUser.full_name}  </h2> <br />
        Choose action <br />
        <Link to="/employees" element ={<EmployeesComp />} >employees</Link> <br />
        <Link to="/departments" element ={<EmployeesComp />} >departments</Link>
    </div>
  )
}

export default MainViewComp
