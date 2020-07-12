import React from "react";
import { Redirect, Route } from "react-router-dom";

const CustomRoute = ({
  path,
  component: Component,
  redirectPath,
  isPrivate = false,
  token,
}: {
  path: string
  component: any;
  redirectPath: string;
  isPrivate: boolean
  token: string | null;
}) => {
  const shouldRender = isPrivate ? token : !token;

  return (
    <Route
      path={path}
      render={(props) =>
        shouldRender ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default CustomRoute;
