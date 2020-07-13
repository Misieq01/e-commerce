import React from 'react'
import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { useHistory,Link } from "react-router-dom";

import {ReactComponent as Logo} from '../../assets/logo.svg'

const Navigation = () =>{

    
    const history = useHistory();

    const config = getConfig("admin");

    const logout = () => {
      console.log("test");
      axios
        .post("/Admin/Logout", null, config)
        .then((res) => {
          localStorage.removeItem("adminToken");
          history.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    return (
      <div className="admin-navigation__container">
        <Logo className='admin-navigation__logo'/>
        <Link to='/Admin/Dashboard' className='admin-navigation__link'>Dashboard</Link>
        <Link to='/Admin/Orders' className='admin-navigation__link'>Orders</Link>
        <Link to='/Admin/Products' className='admin-navigation__link'>Products</Link>
        <Link to='/Admin/Customers' className='admin-navigation__link'>Customers</Link>
        <Link to='/Admin/Content' className='admin-navigation__link'>Content</Link>
        <Link to='/Admin/Reports' className='admin-navigation__link'>Reports</Link>
        <div className='admin-navigation__link' onClick={logout}>Logout</div>
      </div>
    );
}

export default Navigation