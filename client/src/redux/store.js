import { combineReducers, applyMiddleware, createStore } from "redux"

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import loadingReducer from "./reducers/loadingReducers"
import messageReducers from "./reducers/messageReducers"
import userReducer from "./reducers/userReducer"
import doctorReducer from "./reducers/doctorReducer"
import customerserviceReducer from "./reducers/customerserviceReducers"
import clinicReducer from "./reducers/clinicReducer"
import hospitalReducer from "./reducers/hospitalReducer"
import appointmentReducer from "./reducers/appointmentReducer"

const reducer = combineReducers({
    loading: loadingReducer,
    messages: messageReducers,
    auth: userReducer,
    authDoctor: doctorReducer,
    customerservice: customerserviceReducer,
    clinic: clinicReducer,
    hospital: hospitalReducer,
    appointment: appointmentReducer

})


const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store