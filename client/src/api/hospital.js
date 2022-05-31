import axios from "axios";

export const createHospital = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios.post(`${process.env.REACT_APP_API}/hospital/create`, data, config);

    return response;
};
export const getHospitalsApi = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/hospital/list`);

    return response;
};
export const getEachHospitalApi = async (hospitalId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/hospital/${hospitalId}`, config);

    return response;
};
export const getHospitalByProvinceApi = async (province) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/hospital/province/${province}`, config);

    return response;
};
export const getHospitalsBySearch = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.post(`${process.env.REACT_APP_API}/hospital/bysearch`, data, config);

    return response;
};


export const editHospitalApi = async (hospitalId, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/hospital/${hospitalId}`, data, config);

    return response;
};
export const deleteHospitalApi = async (hospitalId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.delete(`${process.env.REACT_APP_API}/hospital/${hospitalId}`, config);

    return response;
};
