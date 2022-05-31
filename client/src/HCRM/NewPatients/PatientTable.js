import React from 'react'
import "../css/Admin.css"
const PatientTable = () => {
    return (
        <div>
            <table id="customers">
                <tr>
                    <th>ID-Name</th>

                    <th>Phone Number</th>
                    <th>Email</th>

                    <th>Actions</th>
                </tr>
                <tr>
                    <td>1-Fidellis</td>

                    <td>+90 382 823 9208</td>
                    <td>dango@gmail.com</td>

                    <td>Information</td>
                </tr>
                <tr>
                    <td>2-Taz</td>

                    <td>+90 532 823 9208</td>
                    <td>taz@gmail.com</td>

                    <td>Information</td>
                </tr>


            </table>
        </div>
    )
}

export default PatientTable