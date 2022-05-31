import React, { useState } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"

import { Tabs, Radio } from 'antd';
import PatientTable from './PatientTable';
import "../css/Admin.css"
const { TabPane } = Tabs;
const NewPatients = () => {


    const [size, setSize] = useState("small")


    const onChange = e => {

        setSize(e.target.value)
    }


    return (
        <div>


            <MainDashboardLayout>


                <div className="newPatient__header">
                    Manage Patients
                </div>


                <div>

                    <Tabs defaultActiveKey="1" type="card" size={size}>
                        <TabPane tab="Need Comfirmation" key="1">
                            <PatientTable />
                        </TabPane>
                        <TabPane tab="Comfirmed" key="2">
                            <PatientTable />
                        </TabPane>
                        <TabPane tab="Cancelled" key="3">
                            <PatientTable />
                        </TabPane>
                    </Tabs>
                </div>



            </MainDashboardLayout>
        </div>
    )
}

export default NewPatients



class Demo extends React.Component {

}

