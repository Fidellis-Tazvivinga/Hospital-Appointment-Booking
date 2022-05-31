import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link, useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { logoutCustomerservice } from "../../helpers/auth";
import { LOGOUT_CUSTOMERSERVICE } from "../../redux/constants/customerserviceConstants";
import MainDashboardLayout from "../MainDashboard/LayoutCompo"
const CustomerServiceDashboard = () => {
  const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));
  const history = useNavigate()
  useEffect(() => {
    if (customerservice === null) {
      history("/customerservice/login")
    }
  }, [customerservice])

  return (
    <div>

      <div>
        <div>
          <MainDashboardLayout>
            {/*  <Body /> */}
            <div className="content-wrapper">
              hello Customer service
            </div>
          </MainDashboardLayout>
        </div>

      </div>
    </div>
  );
};

export default CustomerServiceDashboard;