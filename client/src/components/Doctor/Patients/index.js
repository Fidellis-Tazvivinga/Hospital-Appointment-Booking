import React, { Fragment, useEffect } from "react";

import {
    Link, useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainDashboardLayout from "../../MainDashboard/LayoutCompo"


const DoctorPatients = () => {

    const { authDoctor } = useSelector((state) => ({ ...state }));


    const history = useNavigate()
    useEffect(() => {
        if (authDoctor === null) {
            history("/doctor/login")
        }
    }, [authDoctor])






    return (
        <div>
            <div>
                <MainDashboardLayout>
                    {/*  <Body /> */}
                    <div className="content-wrapper">
                        List of Patients ,that are scheduled for another day
                    </div>
                </MainDashboardLayout>
            </div>

        </div>
    );
};

export default DoctorPatients;