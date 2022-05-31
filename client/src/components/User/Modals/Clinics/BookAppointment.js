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
    const { auth: { token }, auth } = useSelector((state) => ({ ...state }));

    const [valueTime, setValueTime] = useState();
    const [valueDate, setValueDate] = useState();
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
        clinicId: location.state.clinicId,
        nameOfPoliclinic: location.state.specialization,
        doctor: location.state.doctor,
        doctorId: location.state.doctorId,
        examLocation: "any",
        appointmentNote: "",
        appointmentOwner: auth.user._id,
    })
    const { appointmentTime, appointmentDate, appointmentType, appointmentPlace, clinicId, nameOfPoliclinic, doctor, doctorId, examLocation, appointmentNote, appointmentOwner } = formData
    const [checkedTag, setCheckedTag] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleBooked, setIsModalVisibleBooked] = useState(false)

    const handleOkBooked = () => {
        setIsModalVisibleBooked(false);
        history("/user/dashboard")
    };


    const handleOk = async () => {
        setIsModalVisible(false);
        /*   setValueTime("") */
        const res = await createAppointment(token, formData)
            .then((responce) => {
                console.log(responce);
                <Alert
                    message="Informational "
                    description={responce.data.successMessage}
                    type="info"
                    showIcon
                />
                //email about the appointment should be sent to the user 
            }).catch((err) => {
                console.log(err);
            })

        setIsModalVisibleBooked(true)

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



    const onChange = (e, scheduleDate) => {
        console.log('radio checked', e.target.value);
        setValueTime(e.target.value);
        setValueDate(scheduleDate);
        setFormData({ ...formData, appointmentTime: e.target.value, appointmentDate: scheduleDate })
        //open modal
        setIsModalVisible(!isModalVisible);
    };

    const onAppointmentNoteChange = (e) => {
        setFormData({ ...formData, appointmentNote: e.target.value })
    }



    const handleDisable = (time) => {
        if (bookedTime && bookedTime.includes(time)) {
            return true
        }
    }



    const slotsFunc = (scheduleTime, scheduleDate) => {
        const slots = scheduleTime?.reduce((acc, time) =>
            ((hour) => ({ ...acc, [hour]: [...(acc[hour] ?? []), time] }))
                (parseInt(time.split(':')[0], 10)), {});


        return (

            Object.entries(slots).map(([hour, times]) => (
                <>
                    <Panel header={`${(hour + '').padStart(2, '0')}:00`}  >

                        {
                            times.map(time =>
                            (
                                <>
                                    {/*                                     <button onClick={onChange} style={{ margin: "0px 10px", backgroundColor: "lightblue" }}>{time}</button>
 */}

                                    <Radio.Group key={time} onChange={(e) => onChange(e, scheduleDate)} value={valueTime}   >
                                        <Radio.Button key={time} value={time} style={{ margin: "0px 10px", backgroundColor: "lightblue" }} /* disabled={handleDisable(time)} */ >{time}</Radio.Button>

                                    </Radio.Group>
                                </>

                            )
                            )


                        }
                    </Panel>
                </>
            ))

        )
    }


    const dataSource = [

        {
            key: "0.5",
            name: "Appointment Date",
            details: valueDate,
        },
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
                            {
                                allSchedules && allSchedules.map(schedule => {
                                    return (
                                        <>
                                            <TabPane tab={<h6><Moment format="DD/MM/YYYY">
                                                {schedule.date}
                                            </Moment></h6>} key={schedule._id}>
                                                <Collapse accordion>

                                                    {
                                                        slotsFunc(schedule.time, schedule.date)
                                                    }



                                                </Collapse>
                                            </TabPane>

                                        </>
                                    )
                                })

                            }



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