import React, { useState } from 'react'
import "./User.css"

import { AppstoreOutlined, SettingOutlined, LogoutOutlined, DeliveredProcedureOutlined, RadarChartOutlined, StarOutlined, CalendarOutlined, IdcardOutlined, ContactsOutlined, SecurityScanOutlined, HistoryOutlined, LockOutlined, NotificationOutlined, UnlockOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../helpers/auth';

import { LOGOUT_USER } from "../../redux/constants/authConstants";


const { SubMenu } = Menu;
const Header = () => {

    const [current, setCurrent] = useState(null)


    const handleClick = e => {

        setCurrent(e.key);
    };
    function handleClick2(e) {
        console.log('click', e);
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );
    const { auth } = useSelector((state) => ({ ...state }));

    const history = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = (evt) => {



        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
        logoutUser()
        history("/login")
    };


    return (
        <>
            <div className="user__header layout__header">
                <div className="user__header__container">

                    <div className="user__header__logo">
                        <div className="logo__container">
                            <img src="/images/users/moh.png" alt="" />
                        </div>
                        <img className='user__header__logo__head' src="/images/logo/logo1.png" alt="" />
                    </div>

                    <div className="user__header__search">
                        <div className="user__header__search__input">
                            <input type="text" placeholder='Please enter down the hospital, clinic or family doctor information you are looking for an appointment...' />
                        </div>
                    </div>

                    <div className="user__header__profile">

                        <div className="user__header__profile__details">
                            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                                <Menu.Item key="mail" icon={<UsergroupAddOutlined />}>

                                </Menu.Item>
                                <Menu.Item key="app" icon={<SettingOutlined />}>

                                </Menu.Item>

                                <SubMenu key="SubMenu" icon={<AppstoreOutlined />} title="Fidellis Taz">
                                    <Menu onClick={handleClick2} style={{ width: 206 }} mode="vertical">

                                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Account Information">
                                            <Menu.Item key="5" icon={<IdcardOutlined />} >ID Information</Menu.Item>
                                            <Menu.Item key="6" icon={<ContactsOutlined />} >Contact Details</Menu.Item>
                                            <Menu.Item key="7" icon={<SecurityScanOutlined />}  >Password Settings</Menu.Item>
                                            <Menu.Item key="8" icon={<HistoryOutlined />}  >Usage History</Menu.Item>
                                            <Menu.Item key="9" icon={<LockOutlined />}  >Advanced Security Settings</Menu.Item>
                                            <Menu.Item key="10" icon={<NotificationOutlined />}  >Notifications Settings</Menu.Item>
                                            <Menu.Item key="11" icon={<UnlockOutlined />}  >Security Settings</Menu.Item>
                                            <Menu.Item key="12" icon={<UsergroupAddOutlined />}  >Authorized</Menu.Item>


                                        </SubMenu>
                                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Appointment Information">
                                            <Menu.Item key="13" icon={<CalendarOutlined />}  >Appointments History</Menu.Item>
                                            <Menu.Item key="14" icon={<DeliveredProcedureOutlined />}>Appointments Requirement</Menu.Item>
                                            <Menu.Item key="15" icon={<RadarChartOutlined />}>Nearest Hospital</Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                    <Menu.Item key="16" icon={<StarOutlined />}>My Favorites</Menu.Item>
                                    <Menu.Item key="17" icon={<LogoutOutlined />} onClick={handleLogout} >Logout</Menu.Item>
                                </SubMenu>

                            </Menu>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Header