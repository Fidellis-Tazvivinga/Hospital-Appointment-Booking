import axios from "axios";

export const createProvince = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios.post(`${process.env.REACT_APP_API}/province/create`, data, config);

    return response;
};
export const getProvinces = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/province/list`);

    return response;
};
export const getEachProvinceApi = async (provinceId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/province/${provinceId}`, config);

    return response;
};
export const editProvinceApi = async (provinceId, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/province/${provinceId}`, data, config);

    return response;
};
export const deleteProvinceApi = async (provinceId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/province/${provinceId}`);

    return response;
};