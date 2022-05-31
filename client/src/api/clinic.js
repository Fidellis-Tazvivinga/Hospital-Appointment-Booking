import axios from "axios";

export const createClinic = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios.post(`${process.env.REACT_APP_API}/clinic/create`, data, config);

    return response;
};
export const getClinicsApi = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/clinic/list`);

    return response;
};
export const getEachClinicApi = async (clinicId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/clinic/${clinicId}`, config);

    return response;
};
export const getClinicByProvinceApi = async (province) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/clinic/province/${province}`, config);

    return response;
};
export const getClinicsBySearch = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.post(`${process.env.REACT_APP_API}/clinic/bysearch`, data, config);

    return response;
};


export const editClinicApi = async (clinicId, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/clinic/${clinicId}`, data, config);

    return response;
};
export const deleteClinicApi = async (clinicId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.delete(`${process.env.REACT_APP_API}/clinic/${clinicId}`, config);

    return response;
};
