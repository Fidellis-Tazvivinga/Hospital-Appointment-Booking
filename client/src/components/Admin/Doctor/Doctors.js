import React, { useEffect, useState, useRef } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "./Doctor.css"
import { getEachDoctorApi, getDoctorsApi, deleteDoctorApi } from "../../../api/doctor";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";

import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
import { Link, useHistory, useNavigate } from "react-router-dom";

import { Table, Tag, Space } from 'antd';

import ContentHeader from '../../Header/ContentHeader';
import ViewModal from './ViewModal';


const Doctors = () => {

    /*   const { clinic } = useSelector((state) => ({ ...state }));
       const clinics = clinic
   
       console.log(clinics); */
    const history = useNavigate()
    const ref = useRef();

    const [visible, setVisible] = useState(false);
    const [doctors, setDoctors] = useState()
    const [doctor, setDoctor] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {


        loadDoctors()

    }, [])

    const loadDoctors = async () => {
        setLoading(true)

        const res = await getDoctorsApi()
        console.log(res.data.doctors);
        setLoading(false)

        setDoctors(res.data.doctors)

    }


    const editDoctor = async (c) => {
        setVisible(true)
        //get the clinic
        /*   const clinicId = { id }
          const res = await getClinic(clinicId)
          setEachClinic(res.data.clinic) */

        history(`/admin/doctor/${c._id}`)

    }
    const viewDoctor = async (c) => {
        setVisible(true)

        const res = await getEachDoctorApi(c._id)

        setDoctor(res.data.doctor)
    }

    const deleteDoctor = async (c) => {
        setLoading(true)


        const res = await deleteDoctorApi(c._id)
        console.log(res.data.deletedDoctor);

        const res2 = await getDoctorsApi()
        setDoctors(res2.data.doctors)
        setLoading(false)


    }





    return (
        <div>


            <MainDashboardLayout>

                {loading && <div className="">{showLoading()}</div>}

                <ContentHeader link={"/admin/doctor/create"} name={"Doctors"} />
                <div className="hospital__list">
                    <table id="customers">
                        <tr>


                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Hospital/Clinic</th>
                            <th>Phone Number</th>

                            <th>Actions</th>
                        </tr>
                        {
                            doctors && doctors.map((c) => {

                                return (
                                    <tr key={c._id} ref={ref}    >



                                        <td>{c.name}</td>
                                        <td>{c.specialization?.name}</td>
                                        <td>{c.hospital?.hospitalName}</td>
                                        <td>{c.phoneNumber}</td>

                                        <td className="action__icons" >
                                            <Tooltip placement="left" title="Edit" onClick={() => viewDoctor(c)}>
                                                <EyeFilled className='action__edit' />

                                            </Tooltip>
                                            <Tooltip placement="left" title="Edit" onClick={() => editDoctor(c)}>
                                                <EditFilled className='action__edit' />

                                            </Tooltip>
                                            <Tooltip placement="right" title="Delete" onClick={() => deleteDoctor(c)}>
                                                <DeleteFilled className='action__delete' />
                                            </Tooltip>


                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </table>
                    <ViewModal visible={visible} setVisible={setVisible} doctor={doctor} />
                </div>
            </MainDashboardLayout>
        </div>
    )
}

export default Doctors






