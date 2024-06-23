import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function LoginComp() {
  
  const [UserData,SetUserData] = useState()
  const [ErrMsg,SetErrMsg] = useState()

  const serverUrl =  'http://localhost:8000/users/login'

  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeHandler = (e) =>{
    SetUserData({...UserData,[e.target.name]:e.target.value})
  }

  const handleClick = async () =>{
    const resp = await axios.post(serverUrl,UserData)
      if(resp.data.status === "Success")
        {
          SetErrMsg('')
          dispatch({type:"Update_CurrentlyLoggedUser",payload:{
            ...UserData,
            token:resp.data.token,
            id:resp.data.id,
            full_name:resp.data.payload[0].full_name
          }})
          navigate('/index')
        }
      else{
        SetErrMsg(resp.data.Reason)
      }

  }

  return (
    <div>
      User Name : <input type="text" name="username" onChange={changeHandler}></input><br />
      Email : <input type="text" name="email" onChange={changeHandler}></input><br />
      <button onClick={handleClick} >Log in</button><br />
      <span style={{color:"red"}}>{ErrMsg}</span>
    </div>
  )
}

export default LoginComp
