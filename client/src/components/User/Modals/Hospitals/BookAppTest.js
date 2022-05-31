import Header from "../../Header"
import React, { useEffect, useState } from 'react'
import { Tabs, Collapse, Modal, Button, Table, Radio, Alert } from 'antd';
import Moment from 'react-moment'

import "../../User.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { createAppointment, getAppointmentsByDoctorApi } from "../../../../api/appointment"
import { getSchedulesByDoctorApi } from "../../../../api/schedule"
function BookAppointment() {

    const location = useLocation()
    const { auth } = useSelector((state) => ({ ...state }));

    const [valueTime, setValueTime] = useState();
    const [timeDisable, setTimeDisable] = useState(false);
    const [bookedTime, setBookedTime] = useState();
    const [allSchedules, setAllSchedules] = useState();


    useEffect(() => {
        getAllDoctorSchedules()
        getAllDoctorAppointments()
        console.log(location?.state.doctorId, "doctoridiiiiiiiiiii");

    }, [])
    //get all appointment time of the doctor for that day 


    const getAllDoctorAppointments = async () => {
        getAppointmentsByDoctorApi(location?.state.doctorId)
            .then((res) => {
                if (res.data) {
                    const appointments = res.data.appointments
                    let result = appointments.map(({ appointmentTime }) => appointmentTime)
                    console.log("dataa", result);
                    setBookedTime(result)

                }
            })

    }
    const getAllDoctorSchedules = async () => {
        getSchedulesByDoctorApi(location?.state.doctorId)
            .then((res) => {
                if (res.data) {
                    const schedules = res.data.schedules

                    setAllSchedules(schedules)

                }
            })

    }





    const history = useNavigate()
    const [formData, setFormData] = useState({
        appointmentTime: "",
        appointmentDate: "",
        appointmentType: "Examination",
        appointmentPlace: location.state.appointmentPlace,
        hospitalId: location.state.hospitalId,
        nameOfPoliclinic: location.state.specialization,
        doctor: location.state.doctor,
        doctorId: location.state.doctorId,
        examLocation: "any",
        appointmentNote: "",
        appointmentOwner: auth.user._id,
    })
    const { appointmentTime, appointmentType, appointmentPlace, hospitalId, nameOfPoliclinic, doctor, doctorId, examLocation, appointmentNote, appointmentOwner } = formData
    const [checkedTag, setCheckedTag] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleBooked, setIsModalVisibleBooked] = useState(false)

    const handleOkBooked = () => {
        setIsModalVisibleBooked(false);
        history("/user/dashboard")
    };


    const handleOk = async () => {
        setIsModalVisible(false);
        setIsModalVisibleBooked(true)
        /*   setValueTime("") */
        const res = await createAppointment(formData)
            .then((responce) => {
                console.log(responce);
                <Alert
                    message="Informational "
                    description={responce.data.successMessage}
                    type="info"
                    showIcon
                />
            }).catch((err) => {
                console.log(err);
            })

        //send data to backend with all the details in the modal mostly
        //then display a sucess message 
        //email about the appointment should be sent to the user 

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setValueTime("");
    };

    const { Panel } = Collapse;

    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
        setValueTime("")
    }



    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValueTime(e.target.value);
        setFormData({ ...formData, appointmentTime: e.target.value })
        //open modal
        setIsModalVisible(!isModalVisible);
    };

    const onAppointmentNoteChange = (e) => {
        setFormData({ ...formData, appointmentNote: e.target.value })
    }
    const time3 = [
        ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50"],
        ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50"],
        ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50"],
        ["11:00", "11:10", "11:20", "11:30", "11:40", "11:50"],
        ["12:00", "12:10", "12:20", "12:30", "12:40", "12:50"],
        ["13:00", "13:10", "13:20", "13:30", "13:40", "13:50"],
        ["14:00", "14:10", "14:20", "14:30", "14:40", "14:50"],
        ["15:00", "15:10", "15:20", "15:30", "15:40", "15:50"],
        ["16:00", "16:10", "16:20", "16:30", "16:40", "16:50"],
        ["17:00", "17:10", "17:20", "17:30", "17:40", "17:50"],
        ["18:00", "18:10", "18:20", "18:30", "18:40", "18:50"]

    ]
    const time2 = ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50"]


    console.log(bookedTime);
    let timeArrayList = []
    time3.map((timesArray) => {
        return timesArray.map((time) => {
            return timeArrayList.push(time)
        })
    })

    const handleDisable = (t) => {
        if (bookedTime && bookedTime.includes(t)) {
            return true
        }
    }






    const dataSource = [

        {
            key: "1",
            name: "Appointment Time",
            details: valueTime,
        },
        {
            key: "2",
            name: "Appointment Type",
            details: "Examination",
        },
        {
            key: "3",
            name: "Hospital",
            details: appointmentPlace,
        },
        {
            key: "4",
            name: "Name Of Policlinic",
            details: nameOfPoliclinic,
        },
        {
            key: "5",
            name: "Doctor",
            details: doctor,
        },
        {
            key: "6",
            name: "Examination Location",
            details: `${nameOfPoliclinic} Policlinic`,
        },
        {
            key: "7",
            name: "Appointment Note",
            details: <input type="text" onChange={(e) => onAppointmentNoteChange(e)} style={{ outline: "none", border: "1px solid gray", borderRadius: "20px", padding: "4px 10px" }} value={appointmentNote} placeholder="Add note to the Doctor" />,
        },
        {
            key: "8",
            name: "Appointment Owner",
            details: auth.user.username,
        },



    ];

    const columns = [
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

    ]



    return (
        <>
            <Header />
            <div className="user__search">

                <div className="user__search__container">


                    <div className="user__hospital__tabs">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab={<h6><Moment format="DD/MM/YYYY">
                                {new Date()}
                            </Moment></h6>} key="1">
                                <Collapse accordion>

                                    {
                                        time3.map((time, i) => {

                                            return <Panel header={time[0]}   >
                                                {
                                                    time.map((t, i) => {

                                                        return (
                                                            <>
                                                                <Radio.Group key={i} onChange={onChange} value={valueTime}   >
                                                                    <Radio.Button key={i} value={t} style={{ margin: "0px 10px", backgroundColor: "lightblue" }} disabled={handleDisable(t)} >{t}</Radio.Button>

                                                                </Radio.Group>
                                                            </>
                                                        )

                                                    })
                                                }
                                            </Panel>
                                        }


                                        )
                                    }







                                </Collapse>
                            </TabPane>

                            <TabPane tab={<h6><Moment format="DD/MM/YYYY" add={{ days: 1 }}>{new Date()}</Moment></h6>} key="2">
                                <Collapse accordion>
                                    {

                                        time3.map((time, i) => {
                                            return <Panel header={time[0]}   >
                                                {
                                                    time.map((t, i) => {
                                                        return (
                                                            <Radio.Group onChange={onChange} value={valueTime}>
                                                                <Radio key={i} value={t}>{t}</Radio>

                                                            </Radio.Group>

                                                        )

                                                    })
                                                }
                                            </Panel>
                                        }


                                        )
                                    }
                                </Collapse>
                            </TabPane>
                            <TabPane tab={<h6><Moment format="DD/MM/YYYY" add={{ days: 2 }}>{new Date()}</Moment></h6>} key="3">
                                <Collapse accordion>
                                    {

                                        time3.map((time, i) => {
                                            return <Panel header={time[0]}   >
                                                {
                                                    time.map((t, i) => {
                                                        return (
                                                            <Radio.Group onChange={onChange} value={valueTime}>
                                                                <Radio key={i} value={t}>{t}</Radio>

                                                            </Radio.Group>

                                                        )

                                                    })
                                                }
                                            </Panel>
                                        }


                                        )
                                    }
                                </Collapse>
                            </TabPane>
                            <TabPane tab={<h6><Moment format="DD/MM/YYYY" add={{ days: 3 }}>{new Date()}</Moment></h6>} key="4">
                                <Collapse accordion>



                                    <Panel header={time2[0]}   >
                                        {
                                            time2.map((t, i) => {
                                                return (
                                                    /*  <>
                                                         <button  disable={timeDisable}>{t}</button>
                                                     </> */
                                                    <Radio.Group onChange={onChange} value={valueTime}>
                                                        <Radio key={i} disabled={timeDisable} value={t} style={{ margin: "0px 5px" }}>{t}</Radio>

                                                    </Radio.Group>

                                                )

                                            })
                                        }
                                    </Panel>


                                </Collapse>
                            </TabPane>
                        </Tabs>
                    </div>

                </div>
                <Modal className="appointment__table" title="Approve the Appointment" style={{ top: 20 }} okText="Approve Appointment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Table pagination={false} bordered={true} dataSource={dataSource} columns={columns} />;

                </Modal>
                <Modal cancelButtonProps={{ style: { display: 'none' } }} closable={false} visible={isModalVisibleBooked} onOk={handleOkBooked} className="booked__alerts" >
                    <div className="booked__alerts__container">
                        <Alert
                            message="Appointment Booking Success "
                            description="Your Appointment has been successfully booked and registered."
                            type="success"
                            showIcon
                        />
                        <Alert
                            message="Informational Notes"
                            description="Your appointment information has been sent to your email address"
                            type="info"
                            showIcon
                        />
                        <Alert
                            message="Informational Notes"
                            description="You must be at the polyclinic with your identity card at the time of your appointment"
                            type="info"
                            showIcon
                        />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default BookAppointment