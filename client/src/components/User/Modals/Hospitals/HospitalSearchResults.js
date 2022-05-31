import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Header from "../../Header"
import { ArrowLeftOutlined } from "@ant-design/icons"
import "../../User.css"
import { Tabs, List, Avatar, Image } from 'antd';
import { SubnodeOutlined, NodeIndexOutlined, MedicineBoxOutlined, UserOutlined, StarOutlined } from "@ant-design/icons"
import Moment from 'react-moment'

const HospitalSearchResults = () => {
    const [formData, setFormData] = useState({
        appointmentTime: "",
        appointmentType: "",
        appointmentPlace: "",
        nameOfPoliclinic: "",
        doctor: "",
        examLocation: "",
        appointmentNote: "",
        appointmentOwner: "",
    })

    const location = useLocation();
    const [doctors, setDoctors] = useState()
    const [vaccine, setVaccine] = useState()

    useEffect(() => {
        console.log(location?.state.doctors);
        setDoctors(location?.state.doctors)
        setVaccine(location?.state.vaccine)

    }, [])

    const { TabPane } = Tabs;

    function callback(key) {
        console.log(key);
    }

    /* ant list */
    const [state, setState] = useState({
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    })
    useEffect(() => {

        setState({
            initLoading: false,
            data: doctors,
            list: doctors,
        });

    }, [])

    console.log("thsssssssssssssssss", vaccine);
    return (
        <>
            <Header />
            <div className="user__search">

                <div className="user__search__container">

                    <div className="user__search__header">
                        <Link to="/user/dashboard">
                            <ArrowLeftOutlined /></Link>
                        <h2>Hospital List</h2>
                    </div>
                    <div className="user__hospital__tabs">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Hospital" key="1">
                                <List
                                    size="large"
                                    header={<div>Search Filter</div>}
                                    /*  footer={<div>Footer</div>} */
                                    bordered
                                    dataSource={doctors}
                                    renderItem={item =>

                                        <Link to="/user/appointment/hospital" state={{ doctor: item.name, doctorId: item._id, appointmentPlace: item.hospital?.hospitalName, hospitalId: item.hospital?._id, specialization: item.specialization?.name }}>
                                            <List.Item>

                                                <div className="search__hospital"  >
                                                    <div className="search__item star">
                                                        <StarOutlined style={{ fontSize: "25px" }} />
                                                    </div>

                                                    <div className="search__item doctor" >
                                                        <Avatar disabled src='/images/doctors/docmale.png' style={{ width: 35 }} />
                                                        <h6>{item.name}</h6>
                                                    </div>

                                                    <div className="search__item search__hospital__one">
                                                        <h5>Earliest Date</h5>
                                                        <h6><Moment format="DD/MM/YYYY">
                                                            {new Date()}
                                                        </Moment></h6>
                                                    </div>
                                                    <div className="search__item search__hospital__two">
                                                        <MedicineBoxOutlined />
                                                        <p>{item.hospital?.hospitalName}</p>
                                                    </div>
                                                    <div className="search__item search__hospital__three">
                                                        <SubnodeOutlined />
                                                        <p> {item.specialization?.name}  </p>
                                                    </div>
                                                    <div className="search__item search__hospital__four">
                                                        <NodeIndexOutlined />
                                                        <p> {item.specialization?.name}  Polyclinic</p>
                                                    </div>

                                                </div>


                                            </List.Item>

                                        </Link>
                                    }
                                />
                            </TabPane>
                            <TabPane tab="Disctrict Policlinic/Outbuilding" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Alternative Hospitals" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>

                </div>

            </div>

        </>
    )
}

export default HospitalSearchResults