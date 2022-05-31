import React, { useEffect } from "react";
import MainDashboardLayout from "../MainDashboard/LayoutCompo"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Doctor.css"
import DoctorDashWidget from "./components/DoctorDashWidget";

import Table from "./components/Table";
/* import "./helpers/Helpers.css"
 */
const AdminDashboard = ({ type }) => {

  const { authDoctor, clinic, hospital } = useSelector((state) => ({ ...state }));
  const history = useNavigate()

  const dispatch = useDispatch();
  /*  useEffect(() => {
     if (hospital?.hospitals == null) {
       dispatch(getHospitals());
 
     }
   }, [dispatch]);
   useEffect(() => {
     if (clinic?.clinics == null) {
 
       dispatch(getClinics());
     }
 
   }, [dispatch]);
  */

  useEffect(() => {
    if (authDoctor === null) {
      history("/doctor/login")
    }
  }, [authDoctor])



  return (
    <div>
      <MainDashboardLayout>
        <div className="home" >


          <div className="homeContainer">

            <div className="widgets">
              <DoctorDashWidget type="user" />
              <DoctorDashWidget type="order" />
              <DoctorDashWidget type="earning" />
              <DoctorDashWidget type="balance" />

            </div>
            {/*  <div className="charts">
              <Featured />
              <Chart title="Last 6 Months Bookings" aspect={2 / 1} />
            </div> */}
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








