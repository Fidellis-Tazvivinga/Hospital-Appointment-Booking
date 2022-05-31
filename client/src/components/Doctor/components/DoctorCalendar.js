
import React, { useState } from "react";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'



const localizer = momentLocalizer(moment)

const date = '2022-05-23';
const time = '08:00';
const time2 = '08:10';



const events = [
    {
        title: "ng2222",

        start: new Date(`${date}T${time}:00.000Z`),
        end: new Date(`${date}T${time2}:00.000Z`),
    },
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 6, 0),
        end: new Date(2022, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2022, 6, 7),
        end: new Date(2022, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2022, 6, 20),
        end: new Date(2022, 6, 23),
    },
];

function App() {


    return (
        <MainDashboardLayout className="dpp">

            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </MainDashboardLayout>
    );
}

export default App;