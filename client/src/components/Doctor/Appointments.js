import React, { useEffect, useState } from 'react'
import { getAppointmentsByDoctorApi, editAttendedAppointmentApi, confirmDoctorAppointment, confirmAttendedAppointment, cancelAppointmentApi, deleteAppointmentApi } from '../../api/appointment'
import MainDashboardLayout from "../MainDashboard/LayoutCompo"
import { showErrorMsg } from "../../helpers/message";
import { useSelector } from 'react-redux';
import { Tabs, Radio, Button, Modal, Table, Alert } from 'antd';

import { TagOutlined, SubnodeOutlined, NodeIndexOutlined, MedicineBoxOutlined } from "@ant-design/icons"
import moment from 'moment';
//import DoctorAppointments from './components/DoctorAppointments';
//import "./User.css"


const { TabPane } = Tabs;
const Appointments = () => {
    const { authDoctor } = useSelector((state) => ({ ...state }));

    const [appointments, setAppointments] = useState()
    const [errorMsg, setErrorMsg] = useState("")

    //get all appointments
    useEffect(() => {

        getAppointments()
    }, [])

    const getAppointments = async () => {
        await getAppointmentsByDoctorApi(authDoctor.doctor._id)
            .then((responce) => {
                setAppointments(responce.data.appointments)

            }).catch((error) => {
                console.log(error);
            })

    }
    const handleAttended = async (id) => {
        await editAttendedAppointmentApi(id)
    }
    const [size, setSize] = useState("small")

    const handleConfirmAppointment = async (id) => {
        await confirmDoctorAppointment(id)
        getAppointments()
    }
    const onChange = e => {

        setSize(e.target.value)
    }


    const handleCancelAppointment = async (id) => {

        cancelAppointmentApi(id).then((res) => {
            //activate this function after days later
            getAppointments()
        }).catch((err) => {
            console.log(err);
        })



    }



    ///view user appointment info
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewAppointment, setViewAppointment] = useState();
    const [dataSource, setDataSource] = useState();
    const [columns, setColumns] = useState();


    const handleAppointView = (appointment) => {
        setIsModalVisible(true)
        setDataSource([

            {
                key: "0.5",
                name: "Appointment Date",
                details: appointment.appointmentDate,
            },
            {
                key: "1",
                name: "Appointment Time",
                details: appointment.appointmentTime,
            },
            {
                key: "2",
                name: "Appointment Type",
                details: appointment.appointmentType,
            },
            {
                key: "3",
                name: "Hospital",
                details: appointment?.hospital.hospitalName,
            },
            {
                key: "4",
                name: "Name Of Policlinic",
                details: appointment.nameOfPoliclinic,
            },
            {
                key: "5",
                name: "Doctor",
                details: appointment.doctor.name,
            },
            {
                key: "6",
                name: "Examination Location",
                details: `${appointment.nameOfPoliclinic} Policlinic`,
            },
            {
                key: "7",
                name: "Appointment Note",
                details: appointment.appointmentNote,
            },
            {
                key: "8",
                name: "Appointment Owner",
                details: appointment.appointmentOwner.username,
            },




        ]);

        setColumns([
            {
                title: '',
                dataIndex: 'name',
                key: 'name',
            },

            {
                title: '',
                dataIndex: 'details',
                key: 'details',
            },

        ])
    }

    const handleOk = async (appointmentId) => {
        setIsModalVisible(false);


        const res = await confirmDoctorAppointment(appointmentId)
            .then((responce) => {
                console.log(responce);
                <Alert
                    message="Informational "
                    description={responce.data.successMessage}
                    type="info"
                    showIcon
                />
                getAppointments()
            }).catch((err) => {
                console.log(err);
                getAppointments()
            })


    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    const handleAttendedAppointment = async (appointmentId) => {

        const res = await confirmAttendedAppointment(appointmentId)
            .then((responce) => {
                console.log(responce);
                <Alert
                    message="Informational "
                    description={responce.data.successMessage}
                    type="info"
                    showIcon
                />
                getAppointments()
            }).catch((err) => {
                console.log(err);
                getAppointments()
            })
    }



    return (
        <div>


            <MainDashboardLayout>

                <div>

                    <Tabs defaultActiveKey="1" type="card" size={size}>
                        <TabPane tab="Need Comfirmation" key="1">

                            {


                                appointments && appointments.map((appoint) => {
                                    return appoint.appointmentStatus == "Active" &&
                                        (

                                            <div className='prev__appointments'>
                                                <div className="prev__appointment">


                                                    <div className="prev__appointment__card prev__appointment__one">
                                                        <div className='prev__date'  >
                                                            {`${appoint.appointmentDate}  ${appoint.appointmentTime}`}
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>{appoint.appointmentStatus}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>Examination</p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__two">
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <SubnodeOutlined />
                                                            <p>{appoint?.hospital.hospitalName}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <NodeIndexOutlined />
                                                            <p>{appoint.nameOfPoliclinic} </p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__three">
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <MedicineBoxOutlined />
                                                            <p>{appoint.nameOfPoliclinic} {appoint.doctor.name}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <NodeIndexOutlined />
                                                            <p> {appoint.doctor.name} </p>
                                                        </div>
                                                    </div>

                                                    <div className="delete__icon">
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleAppointView(appoint)}  >View</Button>
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleConfirmAppointment(appoint._id)} >Confirm</Button>
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleCancelAppointment(appoint._id)} >Cancel</Button>

                                                    </div>

                                                </div>
                                                <hr />
                                                <Modal className="appointment__table" title="Patient Appointment Details" style={{ top: 20 }} okText="Confirm Appointment" visible={isModalVisible} onOk={() => handleOk(appoint._id)} onCancel={handleCancel}>
                                                    <Table pagination={false} bordered={true} dataSource={dataSource} columns={columns} />;

                                                </Modal>
                                            </div>
                                        )

                                }
                                )




                            }

                        </TabPane>
                        <TabPane tab="Comfirmed" key="2">


                            {
                                appointments && appointments.map((appoint) => {
                                    return appoint.appointmentStatus == "Confirmed" &&
                                        (

                                            <div className='prev__appointments'>
                                                <div className="prev__appointment">


                                                    <div className="prev__appointment__card prev__appointment__one">
                                                        <div className='prev__date'  >
                                                            {`${appoint.appointmentDate}  ${appoint.appointmentTime}`}
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>{appoint.appointmentStatus}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>Examination</p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__two">
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <SubnodeOutlined />
                                                            <p>{appoint?.hospital.hospitalName}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <NodeIndexOutlined />
                                                            <p>{appoint.nameOfPoliclinic} </p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__three">
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <MedicineBoxOutlined />
                                                            <p>{appoint.nameOfPoliclinic} {appoint.doctor.name}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <NodeIndexOutlined />
                                                            <p> {appoint.doctor.name} </p>
                                                        </div>
                                                    </div>

                                                    <div className="delete__icon">
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleAppointView(appoint)}  >View</Button>
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleAttendedAppointment(appoint._id)} >Complete</Button>
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleCancelAppointment(appoint._id)} >Cancel</Button>

                                                    </div>

                                                </div>
                                                <hr />
                                                <Modal className="appointment__table" title="Patient Appointment Details" style={{ top: 20 }} okText="Confirm Appointment" visible={isModalVisible} onOk={() => handleOk(appoint._id)} onCancel={handleCancel}>
                                                    <Table pagination={false} bordered={true} dataSource={dataSource} columns={columns} />;

                                                </Modal>
                                            </div>
                                        )





                                }

                                )
                            }


                        </TabPane>
                        <TabPane tab="Attended" key="3">
                            {
                                appointments && appointments.map((appoint) => {
                                    return appoint.appointmentStatus == "Attended" &&
                                        (

                                            <div className='prev__appointments'>
                                                <div className="prev__appointment">


                                                    <div className="prev__appointment__card prev__appointment__one">
                                                        <div className='prev__date'  >
                                                            {`${appoint.appointmentDate}  ${appoint.appointmentTime}`}
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>{appoint.appointmentStatus}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>Examination</p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__two">
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <SubnodeOutlined />
                                                            <p>{appoint?.hospital.hospitalName}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <NodeIndexOutlined />
                                                            <p>{appoint.nameOfPoliclinic} </p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__three">
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <MedicineBoxOutlined />
                                                            <p>{appoint.nameOfPoliclinic} {appoint.doctor.name}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <NodeIndexOutlined />
                                                            <p> {appoint.doctor.name} </p>
                                                        </div>
                                                    </div>

                                                    <div className="delete__icon">
                                                        <Button type="primary" onClick={() => handleAppointView(appoint)}  >View</Button>
                                                        {/*  <Button type="primary" onClick={() => handleAttendedAppointment(appoint._id)} >Complete</Button>
                                                        <Button type="primary" onClick={() => handleCancelAppointment(appoint._id)} >Cancel</Button>
 */}
                                                    </div>

                                                </div>
                                                <hr />
                                                <Modal className="appointment__table" title="Patient Appointment Details" style={{ top: 20 }} okText="Confirm Appointment" visible={isModalVisible} onOk={() => handleOk(appoint._id)} onCancel={handleCancel}>
                                                    <Table pagination={false} bordered={true} dataSource={dataSource} columns={columns} />;

                                                </Modal>
                                            </div>
                                        )





                                }

                                )
                            }


                        </TabPane>
                        <TabPane tab="Cancelled" key="4">
                            {
                                appointments && appointments.map((appoint) => {
                                    return appoint.appointmentStatus == "Cancelled" &&
                                        (

                                            <div className='prev__appointments'>
                                                <div className="prev__appointment">


                                                    <div className="prev__appointment__card prev__appointment__one">
                                                        <div className='prev__date'  >
                                                            {`${appoint.appointmentDate}  ${appoint.appointmentTime}`}
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>{appoint.appointmentStatus}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__tag__two">
                                                            <TagOutlined />
                                                            <p>Examination</p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__two">
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <SubnodeOutlined />
                                                            <p>{appoint?.hospital.hospitalName}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__two__hospital">
                                                            <NodeIndexOutlined />
                                                            <p>{appoint.nameOfPoliclinic} </p>
                                                        </div>
                                                    </div>
                                                    <div className="prev__appointment__card prev__appointment__three">
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <MedicineBoxOutlined />
                                                            <p>{appoint.nameOfPoliclinic} {appoint.doctor.name}</p>
                                                        </div>
                                                        <div className="prev__icon__content prev__three__hospital">
                                                            <NodeIndexOutlined />
                                                            <p> {appoint.doctor.name} </p>
                                                        </div>
                                                    </div>

                                                    <div className="delete__icon">
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleAppointView(appoint)}  >View</Button>
                                                        {/*  <Button type="primary" onClick={() => handleAttendedAppointment(appoint._id)} >Complete</Button>
 */}
                                                        <Button style={{ margin: "0px 5px" }} type="primary" onClick={() => handleConfirmAppointment(appoint._id)} >Uncancel</Button>
                                                    </div>

                                                </div>
                                                <hr />
                                                <Modal className="appointment__table" title="Patient Appointment Details" style={{ top: 20 }} okText="Confirm Appointment" visible={isModalVisible} onOk={() => handleOk(appoint._id)} onCancel={handleCancel}>
                                                    <Table pagination={false} bordered={true} dataSource={dataSource} columns={columns} />;

                                                </Modal>
                                            </div>
                                        )





                                }

                                )
                            }


                        </TabPane>
                    </Tabs>
                </div>



                {/*  <Schedule /> */}

            </MainDashboardLayout>
        </div>
    )
}

export default Appointments