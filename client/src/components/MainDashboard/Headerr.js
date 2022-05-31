import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutCustomerservice, logoutDoctor, logoutUser } from '../../helpers/auth';

import { LOGOUT_USER } from "../../redux/constants/authConstants";
import { LOGOUT_DOCTOR } from "../../redux/constants/doctorConstants";
import { LOGOUT_CUSTOMERSERVICE } from "../../redux/constants/customerserviceConstants";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    MailOutlined, AppstoreOutlined, SettingOutlined

} from '@ant-design/icons';



const Headerr = ({ handleToggle }) => {

    const { SubMenu } = Menu;

    const [logoutLink, setLogoutLink] = useState("/")
    const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));

    const history = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = (evt) => {

        if (auth?.user.role === 0 || auth?.user.role === 3) {
            setLogoutLink("/login")
            console.log("logoout");
            dispatch({
                type: LOGOUT_USER,
                payload: null
            })
            logoutUser()


        } else if (authDoctor?.doctor.role === 1) {
            setLogoutLink("/doctor/login")
            dispatch({
                type: LOGOUT_DOCTOR,
                payload: null
            })
            logoutDoctor()

        } else if (customerservice?.customerservice.role === 2) {
            setLogoutLink("/customerservice/login")
            dispatch({
                type: LOGOUT_CUSTOMERSERVICE,
                payload: null
            })
            logoutCustomerservice()
            history("/customerservice/login")
        }
    };

    const handleTitle = () => {
        if (auth?.user) {
            return auth.user.name
        } else if (authDoctor?.doctor) {
            return authDoctor.doctor.username
        }
        else if (customerservice?.customerservice) {
            return customerservice.customerservice.username
        }
    }
    const [collapsed, setCollapsed] = useState(false)

    const [current, setCurrent] = useState('mail')

    const handleClick = e => {
        setCurrent(e.key)
    }


    return <>

        <div className="d-flex">
            <div style={{ marginLeft: '20px', fontSize: "20px" }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: handleToggle,
                })}
            </div>
            <div style={{ marginLeft: 'auto' }}>


                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                    <Menu.Item key="mail" icon={<UserOutlined />}>
                        {handleTitle()}
                    </Menu.Item>

                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Settings">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Profile</Menu.Item>
                            <Menu.Item key="setting:2">General</Menu.Item>
                        </Menu.ItemGroup>
                        {/*   <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup> */}
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <a href={logoutLink} rel="noopener noreferrer" onClick={handleLogout}>
                            Logout
                        </a>
                    </Menu.Item>
                </Menu>


            </div>

        </div>
        {/*       <Headerr /> */}


    </>;
};

export default Headerr;
