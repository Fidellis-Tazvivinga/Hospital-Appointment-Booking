import axios from "axios";

export const createSchedule = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios.post(`${process.env.REACT_APP_API}/schedule/create`, data, config);

    return response;
};
export const getSchedules = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/schedule/list`);

    return response;
};
/* export const getSchedulesByDoctor = async (doctorId) => {

    const response = await axios.get(`${process.env.REACT_APP_API}/schedule/list/${doctorId}`);

    return response;
}; */
export const getSchedulesByDoctorApi = async (doctorId) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/schedule/all/${doctorId}`);

    return response;
};

export const getEachScheduleApi = async (scheduleId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/schedule/${scheduleId}`, config);

    return response;
};
export const editScheduleApi = async (scheduleId, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/schedule/${scheduleId}`, data, config);

    return response;
};
export const deleteScheduleByDoctorApi = async (scheduleId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/schedule/${scheduleId}`);

    return response;
};