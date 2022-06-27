import { useEffect, useState } from "react";
//import "./Helpers.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserOutlined } from "@ant-design/icons"
import { Avatar } from 'antd';
import { getAllAppointmentsApi, editAppointmentApi, deleteAppointmentApi } from "../../../api/appointment"
import "./Table.css"
const List = () => {
    const rows = [
        {
            id: 1143155,
            doctor: "Dr Fidellis",
            img: "https://picsum.photos/200",
            specialization: "Cardiology",
            date: "1 March",
            time: "7:10",
            place: "Harare Hospital",
            status: "Approved",
        },
        {
            id: 2235235,
            doctor: "Dr Dango",
            img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
            specialization: "Cardiology",
            date: "1 March",
            time: "9:00",
            place: "Harare Hospital",
            status: "Pending",
        },
        {
            id: 2342353,
            doctor: "Dr Taz",
            img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
            specialization: "Cardiology",
            date: "1 March",
            time: "3:50",
            place: "Harare Hospital",
            status: "Pending",
        },
        {
            id: 2357741,
            doctor: "Dr Phill",
            img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
            specialization: "Cardiology",
            date: "1 March",
            time: "9:20",
            place: "Harare Hospital",
            status: "Approved",
        },
        {
            id: 2342355,
            doctor: "Dr Prince",
            img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
            specialization: "Cardiology",
            date: "1 March",
            time: "2:00",
            place: "Harare Hospital",
            status: "Pending",
        },
    ];

    const [initialAppointStatus, setInitialAppointStatus] = useState()
    const [appointments, setAppointments] = useState()
    useEffect(() => {
        allAppointments()
    }, [])


    const allAppointments = () => {
        getAllAppointmentsApi()
            .then((res) => {
                setAppointments(res.data.appointments)

            })
            .catch(() => {
                alert("Could not get appointments")
            })
    }

    const handleStatusChange = (e, id) => {
        console.log(e.target.value);

        if (e.target.value == "Delete") {
            deleteAppointmentApi(id)
        }
        const status = { appointmentStatus: e.target.value }
        editAppointmentApi(id, status)
            .then((res) => {
                setAppointments(res.data.appointments)
                allAppointments()
            })
            .catch(() => {
                alert("Could not get appointments")
            })
    }


    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Tracking ID</TableCell>
                        <TableCell className="tableCell">Doctor</TableCell>
                        <TableCell className="tableCell">Specialization</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Time</TableCell>
                        <TableCell className="tableCell">Place</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments && appointments.map((appointment) => (
                        <TableRow key={appointment._id}>
                            <TableCell className="tableCell">{appointment?._id}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    {/* <img src={row.img} alt="" className="image" /> */}
                                    <Avatar size="large" icon={<UserOutlined />} />

                                    <span style={{ marginLeft: "5px" }}>{appointment?.doctor.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{appointment?.nameOfPoliclinic}</TableCell>
                            <TableCell className="tableCell">{appointment?.appointmentDate}</TableCell>
                            <TableCell className="tableCell">{appointment?.appointmentTime}</TableCell>
                            <TableCell className="tableCell">{appointment?.hospital.hospitalName}</TableCell>
                            <TableCell className="tableCell">
                                <select name="cars" id="cars" defaultValue={appointment.appointmentStatus} className={`status ${appointment.appointmentStatus}`} onChange={(e) => handleStatusChange(e, appointment?._id)} >
                                    <option value={appointment.appointmentStatus}>{appointment.appointmentStatus}</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Attended">Attended</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Delete">Delete</option>
                                </select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
