import axios from "axios";

export const createSpecialization = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios.post(`${process.env.REACT_APP_API}/specialization/create`, data, config);

    return response;
};
export const getSpecializations = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/specialization/list`);

    return response;
};
export const getEachSpecializationApi = async (specializationId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API}/specialization/${specializationId}`, config);

    return response;
};
export const editSpecializationApi = async (specializationId, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.put(`${process.env.REACT_APP_API}/specialization/${specializationId}`, data, config);

    return response;
};
export const deleteSpecializationApi = async (specializationId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/specialization/${specializationId}`);

    return response;
};