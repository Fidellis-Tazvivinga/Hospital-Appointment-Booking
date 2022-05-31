import React, { useEffect, useState } from "react"
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    MailOutlined, AppstoreOutlined, SettingOutlined

} from '@ant-design/icons';
import "./Dashboard.css"
import SideMenu from "./SideMenu";
import Headerr from "./Headerr"
import { getClinics } from "../../redux/actions/clinicActions";
import { useDispatch } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutCompo = ({ children }) => {




    const [collapsed, setCollapsed] = useState(false)

    const [current, setCurrent] = useState('mail')



    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    const handleToggle = () => {

        console.log("click");
        setCollapsed(!collapsed)

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <SideMenu collpsd={collapsed} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>

                    <Headerr handleToggle={handleToggle} />

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )

}

export default LayoutCompo