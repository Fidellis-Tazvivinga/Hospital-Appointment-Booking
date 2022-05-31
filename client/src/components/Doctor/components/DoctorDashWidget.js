//import "./Helpers.css";

import { UpOutlined, ShoppingCartOutlined, DollarOutlined, AccountBookOutlined, MedicineBoxOutlined, TeamOutlined, SubnodeOutlined, UserOutlined } from "@ant-design/icons"
const AdminDashWidget = ({ type }) => {
    let data;

    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case "user":
            data = {
                title: "New Appointments",
                isMoney: false,
                link: "See all appointments",
                icon: (
                    <MedicineBoxOutlined
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "Attended",
                isMoney: false,
                link: "View all Attended",
                icon: (
                    <SubnodeOutlined
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "Patients",
                isMoney: true,
                link: "View all Patients",
                icon: (
                    <UserOutlined
                        className="icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "Reviews",
                isMoney: true,
                link: "See Reviews",
                icon: (
                    <TeamOutlined
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney /* &&  "$" */} {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <UpOutlined />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default AdminDashWidget;
