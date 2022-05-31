import React, { useState, useEffect } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import { getSchedulesByDoctorApi, deleteScheduleByDoctorApi } from "../../../api/schedule"
import { DatePicker, Space, Table, Tag, Button, Checkbox, Modal, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { EditFilled, DeleteFilled, EyeFilled, ExclamationCircleOutlined } from "@ant-design/icons"


const { confirm } = Modal;

const Schedules = () => {

    const { authDoctor } = useSelector((state) => ({ ...state }));


    const [schedules, setSchedules] = useState([])
    const [eachSchedule, setEachSchedule] = useState([])
    useEffect(() => {
        allSchedules()
    }, [])

    const allSchedules = async () => {
        const res = await getSchedulesByDoctorApi(authDoctor.doctor._id)
        setSchedules(res.data.schedules)
        console.log(res.data.schedules);

    }

    const handleDeleteSchedule = async (id) => {
        confirm({
            title: 'Do you want to delete this schedule',
            icon: <ExclamationCircleOutlined />,
            content: 'You are about to delete the schedule',
            onOk() {
                deleteScheduleByDoctorApi(id).then((res) => {
                    //activate this function after days later
                    allSchedules()
                }).catch((err) => {
                    console.log(err);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    /* 
        const columns = [
            {
                title: 'Selected Date',
                dataIndex: 'date',
                key: 'date',
                render: text => <a>{text}</a>,
            },
    
            {
                title: 'Selected Spots',
                key: 'tags',
                dataIndex: 'tags',
                render: timeOF => (
                    <>
                        {timeOF.map(tag => {
    
                            return (
                                <Tag color="volcano" key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
    
                        <button type='submit' className="btn__add" >Add</button>
                    </Space>
                ),
            },
        ];
    
        const data = [
    
            {
                key: '1',
                date: "checkedDatePhrames",
    
                tags: timeOF,
            },
        ];
     */

    return (
        <div>


            <MainDashboardLayout>

                <ContentHeader link={"/all/schedules/create"} name={"Schedules"} />




                <div>








                    <div>
                        <table id="customers">
                            <tr>


                                <th>Date</th>
                                <th>Free Spots</th>


                                <th>Actions</th>
                            </tr>
                            {schedules &&
                                schedules.map((eachSched) => {
                                    return (

                                        <tr className='schedules__table__tr'>
                                            <td className='schedules__table__date' >{eachSched.date}</td>
                                            <td className='schedules__table__time' >
                                                {
                                                    eachSched.time.map((c) => {

                                                        return (

                                                            <>
                                                                <span> {c}</span>

                                                            </>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td className="action__icons" >
                                                {/*  <Tooltip placement="left" title="Edit" >
                                                    <EyeFilled className='action__edit' />

                                                </Tooltip>
                                                <Tooltip placement="left" title="Edit"  >
                                                    <EditFilled className='action__edit' />

                                                </Tooltip> */}
                                                <Tooltip placement="right" title="Delete" onClick={() => handleDeleteSchedule(eachSched._id)} >
                                                    <DeleteFilled className='action__delete' />
                                                </Tooltip>


                                            </td>
                                        </tr>

                                    )
                                }

                                )
                            }
                        </table>
                    </div>


                </div>

            </MainDashboardLayout>
        </div>
    )
}

export default Schedules