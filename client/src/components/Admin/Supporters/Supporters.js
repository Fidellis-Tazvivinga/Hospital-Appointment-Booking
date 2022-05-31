import React, { useEffect, useRef, useState } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import { useNavigate } from 'react-router-dom'
import { showLoading } from "../../../helpers/loading";

import "../css/Admin.css"
import { deleteSupporterApi, getSupporters } from '../../../api/customerservice'
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
import { Tooltip } from 'antd';

const Supporters = () => {



    const history = useNavigate()
    const ref = useRef();

    const [visible, setVisible] = useState(false);
    const [supporters, setSupporters] = useState()
    const [specialization, setSpecialization] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {


        loadSupporters()

    }, [])

    const loadSupporters = async () => {

        const res = await getSupporters()

        setLoading(false)

        setSupporters(res.data.supporters)

    }


    const editSupporters = async (c) => {
        setVisible(true)

        history(`/admin/supporter/${c._id}`)

    }


    const deleteSupporter = async (s) => {
        const res = await deleteSupporterApi(s._id)
        console.log(res.data.deletedSupporter);
        const res2 = await getSupporters()
        console.log(res2.data.supporters);
        setSupporters(res2.data.supporters)
    }


    return (
        <div>


            <MainDashboardLayout>

                <ContentHeader link={"/admin/supporters/create"} name={"Customer Service"} />

                {loading && <div className="center">{showLoading()}</div>}

                <table id="customers">
                    <tr>


                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Hospital</th>
                        <th>Speciality</th>

                        <th>Actions</th>
                    </tr>
                    {
                        supporters && supporters.map((s) => {

                            return (
                                <tr key={s._id} ref={ref}    >



                                    <td>{s.username}</td>
                                    <td>{s.phoneNumber}</td>
                                    <td>{s.hospital}</td>
                                    <td>{s.specialization}</td>


                                    <td className="action__icons" >

                                        <Tooltip placement="left" title="Edit" onClick={() => editSupporters(s)}>
                                            <EditFilled className='action__edit' />

                                        </Tooltip>
                                        <Tooltip placement="right" title="Delete" onClick={() => deleteSupporter(s)} >
                                            <DeleteFilled className='action__delete' />
                                        </Tooltip>


                                    </td>

                                </tr>
                            )
                        })
                    }



                </table>

            </MainDashboardLayout>
        </div>
    )
}

export default Supporters