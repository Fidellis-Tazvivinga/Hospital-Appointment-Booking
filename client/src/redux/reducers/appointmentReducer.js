import {
    CREATE_APPOINTMENT,
    GET_APPOINTMENTS,
    GET_APPOINTMENT,
    DELETE_APPOINTMENT,
} from '../constants/appointmentConstants';


//so that when the token is still valid,then redux can store the data 
let userState;
if (window.localStorage.getItem("appointments")) {
    userState = JSON.parse(window.localStorage.getItem("appointments"))
} else {
    userState = null
}

const appointmentReducer = (state = userState, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT:
            return {
                appointment: [...state.appointments, action.payload],
            };
        case GET_APPOINTMENTS:
            return {
                appointment: [...action.payload],
            };
        case GET_APPOINTMENT:
            return {
                appointment: action.payload,
            };
        case DELETE_APPOINTMENT:
            return {
                appointment: state.appointments.filter(
                    p => p._id !== action.payload._id
                ),
            };

        default:
            return state;
    }
};

export default appointmentReducer;