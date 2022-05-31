import React, { useEffect, useState, useRef } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import "../css/Admin.css"
import { getEachClinicApi, getClinicsApi, deleteClinicApi } from "../../../api/clinic";
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
import { Tooltip } from 'antd';
import { Link, useHistory, useNavigate } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { useSelector } from "react-redux";

import { createClinic } from "../../../api/clinic";


import { Modal, Button } from 'antd';
import ViewModal from './ViewModal';
import EditClinic from './EditClinic';

const Clinics = () => {
    /*   const { clinic } = useSelector((state) => ({ ...state }));
      const clinics = clinic
  
      console.log(clinics); */
    const history = useNavigate()
    const ref = useRef();

    const [visible, setVisible] = useState(false);
    const [clinics, setClinics] = useState()
    const [clinic, setClinic] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {


        loadClinics()

    }, [])

    const loadClinics = async () => {
        setLoading(true)
        const res = await getClinicsApi()
        setLoading(false)
        console.log(res.data.clinics);
        setClinics(res.data.clinics)

    }


    const editClinic = async (c) => {
        setVisible(true)
        //get the clinic
        /*   const clinicId = { id }
          const res = await getClinic(clinicId)
          setEachClinic(res.data.clinic) */

        history(`/admin/clinic/${c._id}`)

    }
    const viewClinic = async (c) => {
        setVisible(true)

        const res = await getEachClinicApi(c._id)

        setClinic(res.data.clinic)
    }

    const deleteClinic = async (c) => {
        const res = await deleteClinicApi(c._id)
        console.log(res.data.deletedClinic);
        const res2 = await getClinicsApi()
        console.log(res2.data.clinics);
        setClinics(res2.data.clinics)
    }
    return (
        <div>


            <MainDashboardLayout>


                <ContentHeader link={"/admin/clinics/create"} name={"Clinics"} />
                <div className="hospital__list">
                    {loading && <div className="center">{showLoading()}</div>}

                    <table id="customers">
                        <tr>


                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>

                            <th>Actions</th>
                        </tr>
                        {
                            clinics && clinics.map((c) => {

                                return (
                                    <tr key={c._id} ref={ref}    >



                                        <td>{c.clinicName}</td>
                                        <td>{c.clinicPhoneNumber}</td>
                                        <td>{c.clinicAddress}</td>

                                        <td className="action__icons" >
                                            <Tooltip placement="left" title="Edit" onClick={() => viewClinic(c)}>
                                                <EyeFilled className='action__edit' />

                                            </Tooltip>
                                            <Tooltip placement="left" title="Edit" onClick={() => editClinic(c)}>
                                                <EditFilled className='action__edit' />

                                            </Tooltip>
                                            <Tooltip placement="right" title="Delete" onClick={() => deleteClinic(c)}>
                                                <DeleteFilled className='action__delete' />
                                            </Tooltip>


                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </table>
                    <ViewModal visible={visible} setVisible={setVisible} clinic={clinic} />
                </div>
            </MainDashboardLayout>
        </div>
    )
}

export default Clinics