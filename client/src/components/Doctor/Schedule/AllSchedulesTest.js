import React, { useState, useEffect } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import { getSchedulesByDoctor } from "../../../api/schedule"
import { DatePicker, Space, Table, Tag, Button, Checkbox, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
const Schedules = () => {

    const { authDoctor } = useSelector((state) => ({ ...state }));


    const [schedules, setSchedules] = useState([])
    const [eachSchedule, setEachSchedule] = useState([])
    const [tmz, setTmz] = useState([])
    const [dat, setDat] = useState()
    useEffect(() => {
        allSchedules()
    }, [])

    const allSchedules = async () => {
        const res = await getSchedulesByDoctor(authDoctor.doctor._id)
        setSchedules(res.data.schedules)
        const scheduleData = res.data.schedules
        console.log(res.data.schedules);

        scheduleData && scheduleData.map((eachSched) => {

            setTmz(eachSched.time)
            setDat(eachSched.date)
        })
    }



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
            render: tags => (
                <>
                    {tags.map(tag => {

                        return (
                            <Tag color="volcano" key={tag}>
                                {tag}
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

            tags: tmz && tmz,
        },
    ];




    return (
        <div>


            <MainDashboardLayout>

                <ContentHeader link={"/all/schedules/create"} name={"Add Schedule"} />


                all schedules

                <div>

                    <div>

                        {

                            schedules && schedules.map((r) => {
                                return (

                                    <Table columns={columns} dataSource={data} />
                                )
                            })
                        }

                    </div>

                </div>

            </MainDashboardLayout>
        </div>
    )
}

export default Schedules