import axios from "axios";

export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, data, config);

  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, data, config);

  return response;
};