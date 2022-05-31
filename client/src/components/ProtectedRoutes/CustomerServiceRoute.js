import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

const CustomerServiceRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 2 ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default CustomerServiceRoute;