import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
import {
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
} from '../constants/messageConstants';
import {
    CREATE_APPOINTMENT,
    GET_APPOINTMENTS,
    GET_APPOINTMENT,
    DELETE_APPOINTMENT,
} from '../constants/appointmentConstants';
import { getAppointmentsApi } from '../../api/appointment';


export const createAppointment = formData => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.post('/api/appointment/create', formData);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
        dispatch({
            type: CREATE_APPOINTMENT,
            payload: response.data.appointment,
        });
    } catch (err) {
        console.log('Appointment api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getAppointments = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await getAppointmentsApi()
        console.log("got data");
        console.log(response.data.appointments);
        window.localStorage.setItem("appointmet", JSON.stringify(response.data.appointments));
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_APPOINTMENTS,
            payload: response.data.appointments,
        });
    } catch (err) {
        console.log('appointments api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getAppointmentssByCount = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get('/api/appointment/count');
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_APPOINTMENTS,
            payload: response.data.appointments,
        });
    } catch (err) {
        console.log('appointments api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getAppointment = AppointmentsId => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/appointment/${AppointmentsId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_APPOINTMENT,
            payload: response.data,
        });
    } catch (err) {
        console.log('appointment api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const deleteAPPOINTMENT = AppointmentsId => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.delete(`/api/HOSPITAL/${AppointmentsId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: DELETE_APPOINTMENT,
            payload: response.data,
        });
    } catch (err) {
        console.log('Appointments api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};