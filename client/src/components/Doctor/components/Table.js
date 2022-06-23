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
      doctor: "Dr Fidellis",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      specialization: "Cardiology",
      date: "1 March",
      time: "9:00",
      place: "Harare Hospital",
      status: "Pending",
    },
    {
      id: 2342353,
      doctor: "Dr Fidellis",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      specialization: "Cardiology",
      date: "1 March",
      time: "3:50",
      place: "Harare Hospital",
      status: "Pending",
    },
    {
      id: 2357741,
      doctor: "Dr Fidellis",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      specialization: "Cardiology",
      date: "1 March",
      time: "9:20",
      place: "Harare Hospital",
      status: "Approved",
    },
    {
      id: 2342355,
      doctor: "Dr Fidellis",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      specialization: "Cardiology",
      date: "1 March",
      time: "2:00",
      place: "Harare Hospital",
      status: "Pending",
    },
  ];
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {/* <img src={row.img} alt="" className="image" /> */}
                  <Avatar size="large" icon={<UserOutlined />} />

                  <span style={{ marginLeft: "5px" }}>{row.doctor}</span>
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.specialization}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.time}</TableCell>
              <TableCell className="tableCell">{row.place}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
