import {
    CREATE_CLINIC,
    GET_CLINICS,
    GET_CLINIC,
    DELETE_CLINIC,
} from '../constants/clinicConstants';


//so that when the token is still valid,then redux can store the data 
let userState;
if (window.localStorage.getItem("clinics")) {
    userState = JSON.parse(window.localStorage.getItem("clinics"))
} else {
    userState = null
}

const clinicReducer = (state = userState, action) => {
    switch (action.type) {
        case CREATE_CLINIC:
            return {
                clinics: [...state.clinics, action.payload],
            };
        case GET_CLINICS:
            return {
                clinics: [...action.payload],
            };
        case GET_CLINIC:
            return {
                clinic: action.payload,
            };
        case DELETE_CLINIC:
            return {
                clinics: state.clinics.filter(
                    p => p._id !== action.payload._id
                ),
            };

        default:
            return state;
    }
};

export default clinicReducer;