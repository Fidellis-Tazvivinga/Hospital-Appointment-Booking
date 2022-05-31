import React, { useEffect } from "react";
import MainDashboardLayout from "../components/MainDashboard/LayoutCompo"
import Body from "../components/MainDashboard/Body"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card, Col, Row } from 'antd';
import { getClinics } from "../redux/actions/clinicActions";
import { getHospitals } from "../redux/actions/hospitalActions";



const AdminDashboard = () => {

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
      <div>
        <MainDashboardLayout>
          <h1>Hello to HCRM</h1>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="TOTAL NUMBER OF PATIENTS" bordered={false}>
                  100
                </Card>
              </Col>
              <Col span={8}>
                <Card title="DOCTORS" bordered={false}>
                  100
                </Card>
              </Col>
              <Col span={8}>
                <Card title="POSTS" bordered={false}>
                  50
                </Card>
              </Col>
            </Row>
          </div>
        </MainDashboardLayout>
      </div>

    </div>
  );
};

export default AdminDashboard;


