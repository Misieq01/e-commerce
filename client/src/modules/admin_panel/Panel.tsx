import React,{useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {fetchAllProducts} from '../../store/actions/productActions'
import { fetchAllCategories } from "../../store/actions/categoryActions";
import {routes} from '../../routes'

import Navigation from './Navigation'
import Dashboard from './Dashboard/Dashboard'
import Orders from './Orders/Orders'
import ProductPanel from './Products/ProductPanel'
import Customers from './Customers/Customers'
import Content from './Content/Content'
import Reports from './Reports/Reports'

const Panel = () =>{

  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('panel useEffect')
    dispatch(fetchAllProducts())
    dispatch(fetchAllCategories())
  },[])

    return (
      <div className="admin-panel__container">
        <Navigation />
        <Switch>
          <Route path={routes.dashboard} component={Dashboard} />
          <Route path={routes.orders} component={Orders} />
          <Route path={routes.productsPanel} component={ProductPanel} />
          <Route path={routes.customers} component={Customers} />
          {/* <Route path="/Admin/Content" component={Content} />
          <Route path="/Admin/Reports" component={Reports} /> */}
        </Switch>
      </div>
    );
}

export default Panel