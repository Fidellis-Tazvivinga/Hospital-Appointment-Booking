import React from "react"
import { TagOutlined, SubnodeOutlined, NodeIndexOutlined, MedicineBoxOutlined, PrinterOutlined, DeleteFilled } from "@ant-design/icons"
import { Modal, Table } from "antd";
import { QRCodeSVG } from 'qrcode.react';

export const Print = React.forwardRef((props, ref) => {
    const { appoint } = props
    const dataSource = [

        {
            key: "0.5",
            name: "Appointment Date",
            details: appoint?.appointmentDate,
        },
        {
            key: "1",
            name: "Appointment Time",
            details: appoint?.appointmentTime,
        },
        {
            key: "2",
            name: "Appointment Type",
            details: "Examination",
        },
        {
            key: "3",
            name: "Hospital",
            details: appoint?.hospital?.hospitalName,
        },
        {
            key: "4",
            name: "Name Of Policlinic",
            details: appoint?.nameOfPoliclinic,
        },
        {
            key: "5",
            name: "Doctor",
            details: appoint?.doctor?.name,
        },
        {
            key: "6",
            name: "Examination Location",
            details: `${appoint?.nameOfPoliclinic} Policlinic`,
        },





    ];

    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: '',
            dataIndex: 'details',
            key: 'details',
        },

    ]





    return (
        <div ref={ref}>
            <Table pagination={false} bordered={true} dataSource={dataSource} columns={columns} />;

            <QRCodeSVG value="https://reactjs.org/" />,

        </div>
    );
})