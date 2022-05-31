import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 0 ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default UserRoute;