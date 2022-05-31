import React, { useEffect } from "react";
import MainDashboardLayout from "../MainDashboard/LayoutCompo"
import Body from "../MainDashboard/Body"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card, Col, Row } from 'antd';
import { getClinics } from "../../redux/actions/clinicActions";
import { getHospitals } from "../../redux/actions/hospitalActions";


import "./AdminDashboard.css"
import AdminDashWidget from "./helpers/AdminDashWidget";

import Featured from "./helpers/Featured";
import Chart from "./helpers/Chart";
import Table from "./helpers/Table";
/* import "./helpers/Helpers.css"
 */
const AdminDashboard = ({ type }) => {

  const { auth, clinic, hospital } = useSelector((state) => ({ ...state }));
  const history = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    if (hospital?.hospitals == null) {
      dispatch(getHospitals());

    }
  }, [dispatch]);
  useEffect(() => {
    if (clinic?.clinics == null) {

      dispatch(getClinics());
    }

  }, [dispatch]);


  useEffect(() => {
    if (auth === null) {
      history("/login")
    }
  }, [auth])



  return (
    <div>
      <MainDashboardLayout>
        <div className="home" >


          <div className="homeContainer">

            <div className="widgets">
              <AdminDashWidget type="user" />
              <AdminDashWidget type="order" />
              <AdminDashWidget type="earning" />
              <AdminDashWidget type="balance" />

            </div>
            <div className="charts">
              <Featured />
              <Chart title="Last 6 Months Bookings" aspect={2 / 1} />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Appointments</div>
              <Table />
            </div>
          </div>

        </div>
      </MainDashboardLayout>

    </div>
  );
};

export default AdminDashboard;








