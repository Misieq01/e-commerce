import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Login = () =>{

const history = useHistory()

const sendData = () => {
  axios.post("/Admin/Login", data).then(res=>{
    localStorage.setItem('adminToken',res.data)
    history.push('/Admin/Dashboard')
  });
}

const [data,setData] = useState({
    name: '',
    password: ''
})


const updateField = (value: string,field: 'name' | 'password'): void =>{
    setData({...data,[field]:value})
}

    return (
      <div>
        <input placeholder="Name" onChange={(e) => updateField(e.target.value, "name")} />
        <input placeholder="Password" onChange={(e) => updateField(e.target.value, "password")} />
        <button onClick={sendData} >Login</button>
      </div>
    );
}

export default Login