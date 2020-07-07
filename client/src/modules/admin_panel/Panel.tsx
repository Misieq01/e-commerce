import React from 'react'
import axios from 'axios'
import {adminConfig} from '../../utils/axiosConfig'

const Panel = () =>{

    const logout = () =>{
        console.log('test')
        axios.post("/Admin/Logout",null,adminConfig).then(res=>{
            localStorage.removeItem('adminToken')
        }).catch(err=>{
            console.log(err.message)
        });
    }

    console.log(adminConfig)

    return <div>
        <button onClick={logout}>logout</button>
    </div>
}

export default Panel