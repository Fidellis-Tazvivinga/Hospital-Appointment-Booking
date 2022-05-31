import axios from "axios";


export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/customerservice/signup`, data, config);

  return response;
};
export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/customerservice/login`, data, config);

  return response;
};


export const getSupporters = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/customerservice/list`);

  return response;
};
export const getEachSupporterApi = async (customerserviceId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`${process.env.REACT_APP_API}/customerservice/${customerserviceId}`, config);

  return response;
};
export const editSupporterApi = async (customerserviceId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(`${process.env.REACT_APP_API}/customerservice/${customerserviceId}`, data, config);

  return response;
};
export const deleteSupporterApi = async (customerserviceId) => {
  const response = await axios.delete(`${process.env.REACT_APP_API}/customerservice/${customerserviceId}`);

  return response;
};
