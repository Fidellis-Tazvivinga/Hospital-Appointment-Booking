import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteSpecializationApi, getSpecializations } from '../../../api/specialization'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import "../css/Admin.css"
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
import { Tooltip } from 'antd';
import { showLoading } from "../../../helpers/loading";


const Plan = () => {


    const history = useNavigate()
    const ref = useRef();

    const [visible, setVisible] = useState(false);
    const [specializations, setSpecializations] = useState()
    const [specialization, setSpecialization] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {


        loadSpecializations()

    }, [])

    const loadSpecializations = async () => {
        setLoading(true)
        const res = await getSpecializations()
        setLoading(false)
        console.log(res.data.specializations);
        setSpecializations(res.data.specializations)

    }


    const editSpecializations = async (c) => {
        setVisible(true)

        history(`/admin/specializations/${c._id}`)

    }


    const deleteSpecialization = async (s) => {
        setLoading(true)
        const res = await deleteSpecializationApi(s._id)
        console.log(res.data.deletedSpecialization);
        const res2 = await getSpecializations()
        setLoading(false)
        console.log(res2.data.specializations);
        setSpecializations(res2.data.specializations)
    }




    return (
        <div>


            <MainDashboardLayout>

                <ContentHeader link={"/admin/specializations/create"} name={"Specializations"} />

                {loading && <div className="center">{showLoading()}</div>}

                <table id="customers">
                    <tr>


                        <th>Speciality</th>

                        <th>Actions</th>
                    </tr>
                    {
                        specializations && specializations.map((s) => {

                            return (
                                <tr key={s._id} ref={ref}    >



                                    <td>{s.name}</td>


                                    <td className="action__icons" >

                                        <Tooltip placement="left" title="Edit" onClick={() => editSpecializations(s)}>
                                            <EditFilled className='action__edit' />

                                        </Tooltip>
                                        <Tooltip placement="right" title="Delete" onClick={() => deleteSpecialization(s)} >
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

export default Plan