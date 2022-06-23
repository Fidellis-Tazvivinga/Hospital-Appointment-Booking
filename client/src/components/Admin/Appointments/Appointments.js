import React from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import Table from "./Table"
const Appointments = () => {
    return (
        <div>


            <MainDashboardLayout>

                <h4 style={{ textAlign: "center" }} >All Appointments</h4>

                <Table />
            </MainDashboardLayout>
        </div>
    )
}

export default Appointments