import {
    CREATE_HOSPITAL,
    GET_HOSPITALS,
    GET_HOSPITAL,
    DELETE_HOSPITAL,
} from '../constants/hospitalConstants';


//so that when the token is still valid,then redux can store the data 
let userState;
if (window.localStorage.getItem("hospitals")) {
    userState = JSON.parse(window.localStorage.getItem("hospitals"))
} else {
    userState = null
}

const hospitalReducer = (state = userState, action) => {
    switch (action.type) {
        case CREATE_HOSPITAL:
            return {
                HOSPITALs: [...state.hospitals, action.payload],
            };
        case GET_HOSPITALS:
            return {
                hospitals: [...action.payload],
            };
        case GET_HOSPITAL:
            return {
                hospital: action.payload,
            };
        case DELETE_HOSPITAL:
            return {
                hospitals: state.hospitals.filter(
                    p => p._id !== action.payload._id
                ),
            };

        default:
            return state;
    }
};

export default hospitalReducer;