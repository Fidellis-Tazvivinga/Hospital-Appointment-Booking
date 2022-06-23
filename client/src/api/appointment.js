import axios from "axios";

export const createAppointment = async (token, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${process.env.REACT_APP_API}/appointment/create`, data, config);

    return response;
};
export const getAllAppointmentsApi = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/appointment/list`);

    return response;
};
export const getAppointmentsApi = async (userId) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/appointment/list/${userId}`);

    return response;
};
export const getAppointmentsByDoctorApi = async (doctorId) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/appointment/all/${doctorId}`);

    return response;
};
export const getEachAppointmentApi = async (appointmentId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/appointment/${appointmentId}`, config);

    return response;
};

export const editAppointmentApi = async (appointmentId, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/appointment/${appointmentId}`, data, config);

    return response;
};
export const editAttendedAppointmentApi = async (appointmentId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/appointment/attended/${appointmentId}`, config);

    return response;
};



export const confirmDoctorAppointment = async (appointmentId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/appointment/confirm/${appointmentId}`, config);

    return response;
};
export const confirmAttendedAppointment = async (appointmentId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/appointment/attended/${appointmentId}`, config);

    return response;
};

export const cancelAppointmentApi = async (appointmentId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/appointment/cancelled/${appointmentId}`, config);

    return response;
};
export const deleteAppointmentApi = async (appointmentId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.delete(`${process.env.REACT_APP_API}/appointment/${appointmentId}`, config);

    return response;
};
