import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

const DoctorRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 3 ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default DoctorRoute;