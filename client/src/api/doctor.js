import axios from "axios";


export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/doctor/signup`, data, config);

  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/doctor/login`, data, config);

  return response;
};
export const createDoctor = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/doctor/create`, data, config);

  return response;
};



export const getDoctorsApi = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/doctor/list`);

  return response;
};
export const getEachDoctorApi = async (doctorId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`${process.env.REACT_APP_API}/doctor/${doctorId}`, config);

  return response;
};

export const getDoctorsBySearch = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(`${process.env.REACT_APP_API}/doctor/bysearch`, data, config);

  return response;
};
export const getDoctorsBySearchClinic = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(`${process.env.REACT_APP_API}/doctor/bysearch/clinic`, data, config);

  return response;
};

export const editDoctorApi = async (doctorId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(`${process.env.REACT_APP_API}/doctor/${doctorId}`, data, config);

  return response;
};
export const deleteDoctorApi = async (doctorId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.delete(`${process.env.REACT_APP_API}/doctor/${doctorId}`, config);

  return response;
};

