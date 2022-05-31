import React, { useEffect, useState, useRef } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import "../css/Admin.css"
import { getEachHospitalApi, getHospitalsApi, deleteHospitalApi } from "../../../api/hospital";
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
import { Tooltip } from 'antd';
import { Link, useHistory, useNavigate } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { useSelector } from "react-redux";



import { Modal, Button } from 'antd';
import ViewModal from './ViewModal';
import EditHospital from './EditHospital';

const Hospitals = () => {
    /*   const { clinic } = useSelector((state) => ({ ...state }));
      const clinics = clinic
  
      console.log(clinics); */
    const history = useNavigate()
    const ref = useRef();

    const [visible, setVisible] = useState(false);
    const [hospitals, setHospitals] = useState()
    const [hospital, setHospital] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {


        loadHospitals()

    }, [])

    const loadHospitals = async () => {
        setLoading(true)

        const res = await getHospitalsApi()
        console.log(res.data.hospitals);
        setLoading(false)

        setHospitals(res.data.hospitals)

    }


    const editHospital = async (c) => {
        setVisible(true)
        //get the clinic
        /*   const clinicId = { id }
          const res = await getClinic(clinicId)
          setEachClinic(res.data.clinic) */

        history(`/admin/hospital/${c._id}`)

    }
    const viewHospital = async (c) => {
        setVisible(true)

        const res = await getEachHospitalApi(c._id)

        setHospital(res.data.hospital)
    }

    const deleteHospital = async (c) => {
        setLoading(true)


        const res = await deleteHospitalApi(c._id)
        console.log(res.data.deletedHospital);

        const res2 = await getHospitalsApi()
        setHospitals(res2.data.hospitals)
        setLoading(false)


    }
    return (
        <div>


            <MainDashboardLayout>

                {loading && <div className="">{showLoading()}</div>}

                <ContentHeader link={"/admin/hospitals/create"} name={"Hospitals"} />
                <div className="hospital__list">
                    <table id="customers">
                        <tr>


                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>

                            <th>Actions</th>
                        </tr>
                        {
                            hospitals && hospitals.map((c) => {

                                return (
                                    <tr key={c._id} ref={ref}    >



                                        <td>{c.hospitalName}</td>
                                        <td>{c.hospitalPhoneNumber}</td>
                                        <td>{c.hospitalAddress}</td>

                                        <td className="action__icons" >
                                            <Tooltip placement="left" title="Edit" onClick={() => viewHospital(c)}>
                                                <EyeFilled className='action__edit' />

                                            </Tooltip>
                                            <Tooltip placement="left" title="Edit" onClick={() => editHospital(c)}>
                                                <EditFilled className='action__edit' />

                                            </Tooltip>
                                            <Tooltip placement="right" title="Delete" onClick={() => deleteHospital(c)}>
                                                <DeleteFilled className='action__delete' />
                                            </Tooltip>


                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </table>
                    <ViewModal visible={visible} setVisible={setVisible} hospital={hospital} />
                </div>
            </MainDashboardLayout>
        </div>
    )
}

export default Hospitals