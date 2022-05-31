import React, { useEffect, useState } from 'react'
import { Alert, Tabs } from 'antd';
import Appointments from './Appointments';
import PreviousAppointments from './PreviousAppointments';

import "./User.css"
import VaccineModal from "./Modals/Vacc/VaccineModal"
import HospitalModal from "./Modals/Hospitals/HospitalModal"
import ClinicModal from "./Modals/Clinics/ClinicModal"
import { deleteAppointmentApi, getAppointmentsApi } from '../../api/appointment';
import { useSelector } from 'react-redux';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const { TabPane } = Tabs;

const Main = () => {

    //get all the Appointments
    const [appointmentsList, setAppointmentsList] = useState()
    const [formData, setFormData] = useState({
        appointmentStatus: "Active Appointment",
        appointmentPlace: "Harare Hospital",
        policlinic: "Cardiology",
        doctor: "Dr Fidell",
        date: "",
    })
    const { appointmentStatus, appointmentPlace, policlinic, doctor, date } = formData
    const { auth } = useSelector((state) => ({ ...state }));
    useEffect(() => {

        getActiveAppointments()
    }, [])

    const getActiveAppointments = async () => {
        //all apointments
        const res = await getAppointmentsApi(auth.user._id)
        console.log(res.data);
        if (res.data) {
            setAppointmentsList(res.data.appointments)
            //setFormData({ ...formData, appointmentPlace: res.data.hospitalName, policlinic: res.data.nameOfClinic, doctor: res.data.doctor })
        }
    }

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);


    function callback(key) {
        console.log(key);
    }

    const handleCancelAppointment = async (id) => {
        confirm({
            title: 'Do you want to cancel this appointment',
            icon: <ExclamationCircleOutlined />,
            content: 'You are about to delete the appointment',
            onOk() {
                deleteAppointmentApi(id).then((res) => {
                    //activate this function after days later
                    getActiveAppointments()
                }).catch((err) => {
                    console.log(err);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });


    }


    return (
        <div className="user__main">
            <div className="user__main__container">

                <div className="user__main__notification">
                    {/*                     <Alert message='To make a Vaccination Appointment, proceed only by pressing the "Make a Vaccination Appointment" button.' type="info" showIcon closable />
 */}                    <Alert message='Please Note that at the moment you cannot make a Vaccine appointment. You will be able to book the vaccine appointment in a few weeks' type="info" showIcon closable />
                </div>

                <div className="user__main__content">
                    <div className="user__main__content__container">
                        <div className="user__content__left">
                            <div className="user__content__left__cards">
                                <div  /* onClick={() => setVisible(true)} */ className="user__content__left__card user__content__left__card__one">
                                    <div className="user__content__left__card__icon ">
                                        <i>
                                            <img src="/images/users/vacc.png" alt="" />
                                        </i>
                                    </div>
                                    <div className="user__content__left__card__text">

                                        <h3>
                                            Make Vaccination Appointment

                                        </h3>
                                        <h5>You can make a vaccination appointment.</h5>
                                    </div>
                                </div>
                                <div onClick={() => setVisible2(true)} className="user__content__left__card  user__content__left__card__two">
                                    <div className="user__content__left__card__icon">
                                        <i>
                                            <img src="/images/users/doc.png" alt="" />
                                        </i>
                                    </div>
                                    <div className="user__content__left__card__text">
                                        <h3>Make Clinic Appointment</h3>
                                        <h5>You can make a vaccination appointment.</h5>
                                    </div>
                                </div>
                                <div onClick={() => setVisible3(true)} className="user__content__left__card user__content__left__card__three">
                                    <div className="user__content__left__card__icon">
                                        <i>
                                            <img src="/images/users/hospital.png" alt="" />
                                        </i>
                                    </div>
                                    <div className="user__content__left__card__text">
                                        <h3>Make Hospital Appointment</h3>
                                        <h5>You can make a vaccination appointment.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user__content__right">
                            <Tabs onChange={callback} type="card">
                                <TabPane tab="My Appointments" key="1">
                                    {


                                        appointmentsList?.length > 0 ? (
                                            <Appointments handleCancelAppointment={handleCancelAppointment} appointmentsList={appointmentsList && appointmentsList} appointmentStatus appointmentPlace policlinic doctor date="" />

                                        ) : (
                                            <>
                                                <div className="appointments__container">
                                                    <div className="appointments">
                                                        <img src="/images/users/appointments.png" alt="" />
                                                    </div>
                                                    <h3>You do not have an active appointment</h3>
                                                </div>
                                            </>
                                        )
                                    }


                                </TabPane>
                                <TabPane tab="Previous Appointments" key="2">
                                    {


                                        appointmentsList?.length > 0 ? (
                                            <PreviousAppointments handleCancelAppointment={handleCancelAppointment} appointmentsList={appointmentsList && appointmentsList} appointmentStatus appointmentPlace policlinic doctor date="" />

                                        ) : (
                                            <>
                                                <div className="appointments__container">
                                                    <div className="appointments">
                                                        <img src="/images/users/appointments.png" alt="" />
                                                    </div>
                                                    <h3>You do not have an past appointment</h3>
                                                </div>
                                            </>
                                        )
                                    }                                </TabPane>

                            </Tabs>
                        </div>
                    </div>
                </div>

            </div>
            <VaccineModal visible={visible} setVisible={setVisible} />
            <ClinicModal visible2={visible2} setVisible2={setVisible2} />
            <HospitalModal visible3={visible3} setVisible3={setVisible3} />

        </div>
    )
}

export default Main