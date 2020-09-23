import React from "react";
import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { useHistory, Link } from "react-router-dom";
import {routes} from '../../routes'

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as DashboardIcon } from "../../assets/dashboard-icon.svg";
import { ReactComponent as ProductsIcon } from "../../assets/products-icon.svg";
import { ReactComponent as OrdersIcon } from "../../assets/orders-icon.svg";
import { ReactComponent as CustomersIcon } from "../../assets/customers-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout-icon.svg";
import Dashboard from "./Dashboard/Dashboard";

interface ILinkBox {
  to: string;
  text: string,
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const LinkBox = ({ to,text, Icon }: ILinkBox) => {
  return (
    <Link to={to} className="admin-navigation__link">
      <div className="admin-navigation__link-wrapper-center">
        <div className="admin-navigation__link-wrapper-flex-start">
          <Icon className="admin-navigation__link-icon" />
          <span className="admin-navigation__link-text">{text}</span>
        </div>
      </div>
    </Link>
  );
};

const Navigation = () => {
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
    <div className="admin-navigation__background">
      <div className="admin-navigation__wrapper">
        <div className="admin-navigation__container">
          <Logo className="admin-navigation__logo" />
          <LinkBox to={routes.dashboard} Icon={DashboardIcon} text="Dashboard" />
          <LinkBox to={routes.orders} Icon={OrdersIcon} text="Orders" />
          <LinkBox to={routes.products} Icon={ProductsIcon} text="Products" />
          <LinkBox to={routes.customers} Icon={CustomersIcon} text="Customers" />
        </div>
        <div className="admin-navigation__link" onClick={logout}>
          <div className="admin-navigation__link-wrapper-center">
            <LogoutIcon className="admin-navigation__link-icon" />
            <span className="admin-navigation__link-text">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
