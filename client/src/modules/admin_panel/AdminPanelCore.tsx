import React from 'react'
import {Route,Switch,useLocation} from 'react-router-dom'

import Login from './Login'
import Panel from './Panel'


const AdminPanelCore = () =>{

    const location = useLocation().pathname

    console.log(location)

    return <Switch>
        <Route path={location + '/'} component={localStorage.getItem('adminToken') ? Panel : Login} />
    </Switch>
}

export default AdminPanelCore