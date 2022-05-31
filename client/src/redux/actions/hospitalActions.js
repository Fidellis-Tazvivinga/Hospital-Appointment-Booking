import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
import {
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
} from '../constants/messageConstants';
import {
    CREATE_HOSPITAL,
    GET_HOSPITALS,
    GET_HOSPITAL,
    DELETE_HOSPITAL,
} from '../constants/hospitalConstants';
import { getHospitalsApi } from '../../api/hospital';

export const createHospital = formData => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.post('/api/hospital/create', formData);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
        dispatch({
            type: CREATE_HOSPITAL,
            payload: response.data.hospital,
        });
    } catch (err) {
        console.log('createHOSPITAL api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getHospitals = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await getHospitalsApi()
        console.log("got data");
        console.log(response.data.hospitals);
        window.localStorage.setItem("hospitals", JSON.stringify(response.data.hospitals));
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_HOSPITALS,
            payload: response.data.hospitals,
        });
    } catch (err) {
        console.log('getHOSPITALs api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const gethospitalsByCount = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get('/api/hospital/count');
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_HOSPITALS,
            payload: response.data.hospitals,
        });
    } catch (err) {
        console.log('getHOSPITALs api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getHospital = HospitalId => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/HOSPITAL/${HospitalId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_HOSPITAL,
            payload: response.data,
        });
    } catch (err) {
        console.log('getHOSPITALs api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const deleteHOSPITAL = HOSPITALId => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.delete(`/api/HOSPITAL/${HOSPITALId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: DELETE_HOSPITAL,
            payload: response.data,
        });
    } catch (err) {
        console.log('deleteHOSPITAL api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};