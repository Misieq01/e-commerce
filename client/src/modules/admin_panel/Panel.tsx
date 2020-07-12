import React from 'react'
import axios from 'axios'
import {getConfig} from '../../utils/axiosConfig'
import {useHistory} from 'react-router-dom'

const Panel = () =>{

    const history = useHistory()

    const config = getConfig('admin')

    const logout = () =>{
        console.log('test')
        axios.post("/Admin/Logout",null,config).then(res=>{
            localStorage.removeItem('adminToken')
            history.push('/')
        }).catch(err=>{
            console.log(err.message)
        });
    }
    return <div>
        <button onClick={logout}>logout</button>
    </div>
}

export default Panel