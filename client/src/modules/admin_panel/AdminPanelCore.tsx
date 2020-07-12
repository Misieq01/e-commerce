import React from "react";
import { Switch, useLocation } from "react-router-dom";
import CustomRoute from "../../components/CustomRoute";

import Login from "./Login";
import Panel from "./Panel";

const AdminPanelCore = () => {
  const location = useLocation().pathname;

  console.log(location);

  return (
    <Switch>
    <CustomRoute
      path={"/Admin/Login"}
      component={Login}
      token={localStorage.getItem("adminToken")}
      redirectPath={"/Admin"}
      isPrivate={false}
    />
      <CustomRoute
        path="/Admin"
        redirectPath={"/Admin/Login"}
        token={localStorage.getItem("adminToken")}
        component={Panel}
        isPrivate={true}
      />
    </Switch>
  );
};

export default AdminPanelCore;
