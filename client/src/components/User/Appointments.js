import React, { useRef } from 'react';
import { TagOutlined, SubnodeOutlined, NodeIndexOutlined, MedicineBoxOutlined, PrinterOutlined, DeleteFilled } from "@ant-design/icons"
import "./User.css"
import { Button } from "antd"
import { deleteAppointmentApi } from '../../api/appointment'
import moment from "moment"
import ReactToPrint from 'react-to-print';

import Print from '../utils/Print';

const Appointments = ({ appointmentsList, handleCancelAppointment, appointmentStatus, doctor, appointmentPlace, policlinic, date }) => {


    const componentRef = useRef();


    return (
        <>


            {
                appointmentsList && appointmentsList.map((appoint) => {
                    return appoint.appointmentStatus == "Active" && (

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
                                    {appoint.hospital && (<div className="prev__icon__content prev__two__hospital">
                                        <SubnodeOutlined />
                                        <p>{appoint.hospital?.hospitalName}</p>
                                    </div>)}
                                    {appoint.clinic && (<div className="prev__icon__content prev__two__hospital">
                                        <SubnodeOutlined />
                                        <p>{appoint.clinic?.clinicName}</p>
                                    </div>)}

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
                                    <DeleteFilled onClick={() => handleCancelAppointment(appoint._id)} />
                                    <div>
                                        <ReactToPrint
                                            trigger={() => <PrinterOutlined />}
                                            content={() => componentRef.current}
                                        />
                                        <Print ref={componentRef} appoint={appoint} />
                                    </div>

                                    {/*                                     <Button type="primary" onClick={() => handleCancelAppointment(appoint._id)}>Cancel</Button>
 */}                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default Appointments