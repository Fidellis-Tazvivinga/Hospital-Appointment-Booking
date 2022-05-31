import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Header from "../../Header"
import { ArrowLeftOutlined } from "@ant-design/icons"
import "../../User.css"
import { Tabs, List } from 'antd';
import { SubnodeOutlined, NodeIndexOutlined, MedicineBoxOutlined } from "@ant-design/icons"
import Moment from 'react-moment'

const SearchList = () => {

    const location = useLocation();

    const [hospitals, setHospitals] = useState()
    const [vaccine, setVaccine] = useState()


    useEffect(() => {
        console.log(location?.state.hospitals);
        setHospitals(location?.state.hospitals)
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
            data: hospitals,
            list: hospitals,
        });

    }, [])

    console.log("thsssssssssssssssss", vaccine);
    return (
        <>
            <Header />
            <div className="user__search">

                <div className="user__search__container">

                    <div className="user__search__header">
                        <ArrowLeftOutlined />
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
                                    dataSource={hospitals}
                                    renderItem={item =>

                                        <Link to="/user/dashboard" >
                                            <List.Item>

                                                <div className="search__hospital"  >


                                                    <div className="search__item search__hospital__one">
                                                        <h5>Earliest Date</h5>
                                                        <h6><Moment format="DD/MM/YYYY">
                                                            {new Date()}
                                                        </Moment></h6>
                                                    </div>
                                                    <div className="search__item search__hospital__two">
                                                        <MedicineBoxOutlined />
                                                        <p>{item.hospitalName}</p>
                                                    </div>
                                                    <div className="search__item search__hospital__three">
                                                        <SubnodeOutlined />
                                                        <p>Covid-19 Vaccine Application  </p>
                                                    </div>
                                                    <div className="search__item search__hospital__four">
                                                        <NodeIndexOutlined />
                                                        <p> Vaccine Application</p>
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

export default SearchList