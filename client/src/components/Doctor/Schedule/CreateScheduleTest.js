import React, { useEffect, useState } from 'react'
import "./Schedule.css"

import { DatePicker, Space, Table, Tag, Button, Checkbox, Tooltip } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled, PlusOutlined } from '@ant-design/icons';
import { createSchedule } from '../../../api/schedule';
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"

const CreateSchedule = () => {
    const { authDoctor } = useSelector((state) => ({ ...state }));


    const [formData, setFormData] = useState({
        doc: authDoctor.doctor._id,
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        doc,
        successMsg,
        errorMsg,
        loading,
    } = formData;
    const [checkedTimePhrames, setCheckedTime] = useState([])
    const [checkedDatePhrames, setCheckedDate] = useState([])
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);

    const columns = [
        {
            title: 'Selected Date',
            dataIndex: 'date',
            key: 'date',
            render: text => <a>{text}</a>,
        },

        {
            title: 'Available Spots',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {

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

                    <button type='submit' onClick={handleSubmit} className="btn__add" >Add</button>
                </Space>
            ),
        },
    ];

    const data = [

        {
            key: '1',
            date: checkedDatePhrames,

            tags: checkedTimePhrames,
        },
    ];


    useEffect(() => {
        //get all appointments available for the doctor
        //later on they will have a status , whether they were done or pending /cancelled
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (

            checkedDatePhrames.length == 0 ||
            checkedTimePhrames.length == 0 ||
            isEmpty(doc)

        ) {
            setFormData({
                ...formData,
                loading: false,
                errorMsg: "All fields are required",
            });
        } else {

            setFormData({
                ...formData,
                loading: true,
                successMsg: false,
                errorMsg: false
            });
            //send datat



            const data = { doc, checkedDatePhrames, checkedTimePhrames }

            const res = await createSchedule(data)
                .then((responce) => {

                    console.log(responce.data.newSchedule);
                    setCheckedDate()
                    setCheckedTime([])
                    setFormData({
                        ...formData,
                        loading: false,
                        successMsg: responce.data.successMessage,
                    });
                }).catch((err) => {
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.responce.data.errorMessage,
                    });
                })
        }



    }

    function onChangee(date, dateString) {

        setCheckedDate(dateString)
        setFormData({
            ...formData,
            loading: false,
            successMsg: false,
            errorMsg: false
        });
    }

    function onChange(checkedValues) {

        setCheckedTime(checkedValues)
        setIndeterminate(!!checkedValues.length && checkedValues.length < plainOptions.length);
        setCheckAll(checkedValues.length === plainOptions.length);
        setFormData({
            ...formData,
            loading: false,
            successMsg: false,
            errorMsg: false
        });
    }
    const time3 = [
        ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50"],
        ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50"],
        ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50"],
        ["11:00", "11:10", "11:20", "11:30", "11:40", "11:50"],
        ["12:00", "12:10", "12:20", "12:30", "12:40", "12:50"],
        ["13:00", "13:10", "13:20", "13:30", "13:40", "13:50"],
        ["14:00", "14:10", "14:20", "14:30", "14:40", "14:50"],
        ["15:00", "15:10", "15:20", "15:30", "15:40", "15:50"],
        ["16:00", "16:10", "16:20", "16:30", "16:40", "16:50"],
        ["17:00", "17:10", "17:20", "17:30", "17:40", "17:50"],
        ["18:00", "18:10", "18:20", "18:30", "18:40", "18:50"]

    ]
    const timef = time3.map((time) => {
        return time
    })

    const onCheckAllChange = e => {
        setCheckedTime(e.target.checked ? timef : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);

    };
    const plainOptions = ['08:00', '08:10', '08:20', '08:30', '08:40', '08:50'];

    const [times, setTimes] = useState([])

    const handleTimeSelected = (array, e) => {
        const timeValue = e.target.value

        const index = array.indexOf(timeValue);

        if (index === -1) {
            array.push(timeValue);
        } else {
            array.splice(index, 1);
        }
        console.log(times);
    }


    return (
        <>
            <MainDashboardLayout>
                <div class="d-sm-flex align-items-center justify-content-between mb-4">

                    <h1 class="h3 mb-0 text-gray-800">Add a clinic schedule</h1>
                </div>
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
                {loading && <div className="">{showLoading()}</div>}


                <div class="row">
                    <div class="col-10 mx-auto">

                        <div class="mb-4">
                            <span>Select Date:</span>
                            <div id="lsBtnSchedule flex">
                                <Space direction="vertical">
                                    <DatePicker onChange={onChangee} />

                                </Space>,
                            </div>
                        </div>
                        <div class="mb-4">
                            <span>Select time period:</span>
                            <div id="lsBtnSchedule flex">

                                <table id="customers">
                                    <tr>


                                        <th>Date</th>
                                        <th>Free Spots</th>


                                        <th>Actions</th>
                                    </tr>
                                    {
                                        time3.map((time) => {
                                            return (

                                                <tr>
                                                    <td>{checkedDatePhrames && checkedDatePhrames}</td>
                                                    <td>
                                                        {
                                                            time.map((c) => {

                                                                return (

                                                                    <>

                                                                        <input type="checkbox" onClick={(e) => handleTimeSelected(times, e)} value={c} />
                                                                        <label htmlFor="">{c}</label>

                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                    <td className="action__icons" >
                                                        <Tooltip placement="left" title="Edit" >
                                                            <EyeFilled className='action__edit' />

                                                        </Tooltip>
                                                        <Tooltip placement="left" title="Edit"  >
                                                            <EditFilled className='action__edit' />

                                                        </Tooltip>
                                                        <Tooltip placement="right" title="Delete" >
                                                            <DeleteFilled className='action__delete' />
                                                        </Tooltip>


                                                    </td>
                                                </tr>

                                            )
                                        }

                                        )
                                    }
                                </table>


                                {/*     {
                                    time3.map((time) => {
                                        return (
                                            <>
                                                <div className="checkAll">
                                                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                                        Check all
                                                    </Checkbox>

                                                </div>
                                                <Checkbox.Group options={time} value={checkedTimePhrames} onChange={onChange} />
                                            </>
                                        )
                                    })
                                } */}
                                {/*  <div className="checkAll">
                                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                        Check all
                                    </Checkbox>

                                </div>
                                <Checkbox.Group options={plainOptions} value={checkedTimePhrames} onChange={onChange} />
 */}
                                <br />
                                <br />
                            </div>
                        </div>


                        <div>
                            <Table columns={columns} dataSource={data} />
                        </div>

                        <button type='submit' className="btn__add btn__big" onClick={handleSubmit}   >Add</button>

                    </div>
                </div>

            </MainDashboardLayout>

        </>
    )
}

export default CreateSchedule