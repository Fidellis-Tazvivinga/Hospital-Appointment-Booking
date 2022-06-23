import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOGOUT_USER } from "../../redux/constants/authConstants";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
    AppstoreOutlined,
    UsergroupAddOutlined,

    ScheduleOutlined,
    FieldTimeOutlined,
    BarChartOutlined,
    UserAddOutlined,
    CustomerServiceOutlined,
    CopyOutlined,
    BankFilled
} from '@ant-design/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const SideMenu = ({ collpsd }) => {
    // submenu keys of first level
    const rootSubmenuKeys = ['sub1', 'sub2'];

    const [openKeys, setOpenKeys] = React.useState([]);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    const handleSubMenuToogle = (e) => {
        console.log(e.target.name);
        const keyName = e.target.name
        if (keyName = "key11") {
            console.log("hello keys");
        } else {
            console.log("not keys");
        }
    }


    const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));

    const handleTitle = () => {
        if (auth?.user.role == 0) {
            return "Patient"
        } else if (authDoctor?.doctor) {
            return "Doctor"
        }
        else if (customerservice?.customerservice) {
            return "Supporter"
        } else {
            return "Admin"
        }
    }

    const [rolelink, setRoleLink] = useState()


    useEffect(() => {
        if (auth?.user) {
            setRoleLink("patient")
        } else if (authDoctor?.doctor) {
            setRoleLink("doctor")
        }
        else if (customerservice?.customerservice) {
            setRoleLink("customerservice")
        } else {
            setRoleLink("admin")
        }

    }, [rolelink])

    const handleUsername = () => {
        if (auth?.user) {
            return auth.user.username
        } else if (authDoctor?.doctor) {
            return authDoctor.doctor.name
        }
        else if (customerservice?.customerservice) {
            return customerservice.customerservice.username
        }
    }

    const handleSidebarTitle = () => {
        if (collpsd) {
            return "none"
        } else {
            return "block"
        }

    }

    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        }}>
            <div style={{
                fontSize: "32px",
                color: "white",
                marginTop: "-5px",
                marginRight: "6px"
            }}>
                <BankFilled />
            </div>
            <div style={{
                height: "64px", fontSize: "20px",
                fontWeight: "900",
                fontFamily: "sans-serif", color: "white",
                textAlign: "center", paddingTop: "20px",
                letterSpacing: "1.4px",
                display: handleSidebarTitle()
            }} className="logo" >Doctor Care</div>

        </div>

        <Menu theme="dark" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} >
            <Menu.Item key="0" icon={<AppstoreOutlined />} style={{
                paddingBottom: "0px"
            }} >
                <Link to={`/${rolelink}/dashboard`}>Dashboard</Link>
            </Menu.Item>
            <hr color='gray' />
            {/* only for Admins */}

            {auth?.user.role == 3 && (


                <>
                    <p style={{
                        marginLeft: "15px", paddingBottom: "10px", fontWeight: "700"
                    }} >Admins</p>
                    <hr color='gray' />
                    <SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="Users" style={{
                        paddingBottom: "0px"
                    }} >
                        <Menu.Item key="1" >

                            <Link to="/admin/doctors"  >
                                Doctors
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/admin/patients"  >Patients</Link>
                        </Menu.Item>
                        <Menu.Item key="3"><Link to="/admin/supporters"  >Supporters</Link></Menu.Item>

                    </SubMenu>


                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Others" style={{
                        paddingBottom: "20px"
                    }} >
                        <Menu.Item key="5"><Link to="/admin/hospitals">Hospitals</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/admin/clinics">Clinics</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/admin/specializations">Specializations</Link></Menu.Item>

                    </SubMenu>
                    <hr color='gray' />
                </>

            )}


            {(authDoctor?.doctor) && (


                <>

                    <p style={{
                        marginLeft: "15px", fontWeight: "700", paddingBottom: "10px"
                    }} >Doctors</p>
                    <hr color='gray' />

                    <Menu.Item key="8" icon={<ScheduleOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/doctor/appointments">Appointments</Link>
                    </Menu.Item>
                    <Menu.Item key="8.1" icon={<ScheduleOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/doctor/appointments/calendar">Calendar</Link>
                    </Menu.Item>

                    <Menu.Item key="9" icon={<FieldTimeOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/doctor/schedules">Schedules</Link>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<UsergroupAddOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/doctor/patients">Patients</Link>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<BarChartOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/all/statistics">Statistical</Link>
                    </Menu.Item>
                    <hr color='gray' />
                </>

            )
            }
            {(auth?.user.role == 3) && (


                <>

                    <p style={{
                        marginLeft: "15px", fontWeight: "700", paddingBottom: "10px"
                    }} >Doctors</p>
                    <hr color='gray' />

                    <Menu.Item key="8" icon={<ScheduleOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/admin/appointments">Appointments</Link>
                    </Menu.Item>
                    <Menu.Item key="8.1" icon={<ScheduleOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/admin/appointments/calendar">Calendar</Link>
                    </Menu.Item>

                    <Menu.Item key="9" icon={<FieldTimeOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/admin/schedules">Schedules</Link>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<UsergroupAddOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/admin/patients">Patients</Link>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<BarChartOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/all/statistics">Statistical</Link>
                    </Menu.Item>
                    <hr color='gray' />
                </>

            )
            }




            {(auth?.user.role == 3 || customerservice?.customerservice) && (



                <>

                    <p style={{
                        marginLeft: "15px",
                        paddingBottom: "10px",
                        fontWeight: "700"
                    }} >Counselors</p>
                    <hr color='gray' />
                    <Menu.Item key="11" icon={<UserAddOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/newpatients">   New Patients</Link>

                    </Menu.Item>

                    <Menu.Item key="12" icon={<CopyOutlined />} style={{
                        paddingBottom: "20px"
                    }}  >
                        <Link to="/all/posts">  Posts</Link>

                    </Menu.Item>
                    <Menu.Item key="13" icon={<CustomerServiceOutlined />} style={{
                        paddingBottom: "20px"
                    }} >
                        <Link to="/customercare">    Customer Care</Link>

                    </Menu.Item>
                </>


            )
            }

        </Menu>
    </div>;
};

export default SideMenu;
