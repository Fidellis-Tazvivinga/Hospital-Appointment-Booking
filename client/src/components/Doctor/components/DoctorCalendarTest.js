import { Calendar, Badge } from 'antd';
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import "../Doctor.css"
function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'You have an appointment at 08:30' },
                { type: 'success', content: 'You have an appointment at 08:30' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'You have an appointment at 08:30' },
                { type: 'success', content: 'You have an appointment at 08:30' },
                { type: 'error', content: 'You have an appointment at 08:30' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'You have an appointment at 08:30' },
                { type: 'success', content: 'You have an appointment at 08:30' },
                { type: 'error', content: 'You have an appointment at 08:30' },
                { type: 'error', content: 'You have an appointment at 08:30' },
                { type: 'error', content: 'You have an appointment at 08:30' },
                { type: 'error', content: 'You have an appointment at 08:30' },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}  >
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

export default () => <MainDashboardLayout><Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} /></MainDashboardLayout>;