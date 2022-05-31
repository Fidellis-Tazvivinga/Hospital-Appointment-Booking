/* import { MedicineBoxOutlined, NodeIndexOutlined, SubnodeOutlined, TagOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import moment from 'moment'
import React from 'react'

const DoctorAppointments = ({ appoint, handleConfirmAppointment }) => {
    return (

        <div className='prev__appointments'>
            <div className="prev__appointment">


                <div className="prev__appointment__card prev__appointment__one">
                    <div className='prev__date'  >
                        {`${moment().format('MMMM Do YYYY')}  ${appoint?.appointmentTime}`}
                    </div>
                    <div className="prev__icon__content prev__tag__two">
                        <TagOutlined />
                        <p>{appoint?.appointmentStatus}</p>
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
                        <p>{appoint?.nameOfPoliclinic} </p>
                    </div>
                </div>
                <div className="prev__appointment__card prev__appointment__three">
                    <div className="prev__icon__content prev__three__hospital">
                        <MedicineBoxOutlined />
                        <p>{appoint?.nameOfPoliclinic} {appoint?.doctor.name}</p>
                    </div>
                    <div className="prev__icon__content prev__three__hospital">
                        <NodeIndexOutlined />
                        <p> {appoint?.doctor.name} </p>
                    </div>
                </div>

                <div className="delete__icon">
                    <Button type="primary"  >Cancel</Button>
                    <Button type="primary" onClick={() => handleConfirmAppointment(appoint._id)} >Confirm</Button>
                </div>

            </div>
            <hr />
        </div>
    )
}

export default DoctorAppointments


 */