import React from 'react'
import {Switch,Route} from 'react-router-dom'

import Navigation from './Navigation'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Products from './Products'
import Customers from './Customers'
import Content from './Content'
import Reports from './Reports'

const Panel = () =>{

    return (
      <div className="admin-panel__container">
        <Navigation />
        <Switch>
          <Route path='/Admin/Dashboard' component={Dashboard}/>
          <Route path='/Admin/Orders' component={Orders}/>
          <Route path='/Admin/Products' component={Products}/>
          <Route path='/Admin/Customers' component={Customers}/>
          <Route path='/Admin/Content' component={Content}/>
          <Route path='/Admin/Reports' component={Reports}/>
        </Switch>
      </div>
    );
}

export default Panel