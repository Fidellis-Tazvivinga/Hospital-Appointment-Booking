import { setCookie, getCookie, deleteCookie } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, user) => {
  setCookie("token", token);
  setLocalStorage("user", user);
};

export const isAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

export const logoutUser = (next) => {
  deleteCookie("token");
  deleteLocalStorage("user");
  /* 
    next(); */
};
export const logoutDoctor = (next) => {
  deleteCookie("token");
  deleteLocalStorage("doctor");

};
export const logoutCustomerservice = (next) => {
  deleteCookie("token");
  deleteLocalStorage("customerservice");

};