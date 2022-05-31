import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
import {
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
} from '../constants/messageConstants';
import {
    CREATE_CLINIC,
    GET_CLINICS,
    GET_CLINIC,
    DELETE_CLINIC,
} from '../constants/clinicConstants';
import { editClinicApi, getClinicsApi, getEachClinicApi } from '../../api/clinic';

export const createClinic = formData => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.post('/api/clinic/create', formData);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
        dispatch({
            type: CREATE_CLINIC,
            payload: response.data.clinic,
        });
    } catch (err) {
        console.log('createCLINIC api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getClinics = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await getClinicsApi()
        console.log("got data");
        console.log(response.data.clinics);
        window.localStorage.setItem("clinics", JSON.stringify(response.data.clinics));
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_CLINICS,
            payload: response.data.clinics,
        });
    } catch (err) {
        console.log('getCLINICs api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getClinicsByCount = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get('/api/clinic/count');
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_CLINICS,
            payload: response.data.CLINICs,
        });
    } catch (err) {
        console.log('getCLINICs api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const getClinic = clinicId => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await getEachClinicApi(clinicId)
        console.log(response.data);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: GET_CLINIC,
            payload: response.data
        });
    } catch (err) {
        console.log('getCLINICs api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};

export const deleteClinic = ClinicId => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.delete(`/api/clinic/${ClinicId}`);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: DELETE_CLINIC,
            payload: response.data,
        });
    } catch (err) {
        console.log('deleteCLINIC api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};