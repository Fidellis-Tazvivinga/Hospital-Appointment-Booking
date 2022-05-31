import {LOGGED_IN_DOCTOR,LOGOUT_DOCTOR} from "../constants/doctorConstants"


let userState ;
if(window.localStorage.getItem("doctor")){
  userState = JSON.parse(window.localStorage.getItem("doctor"))
}else{
  userState = null
}

const doctorReducer = (state=userState,action)=>{
    switch (action.type) {
        case LOGGED_IN_DOCTOR:
           return {
               ...state,
               ...action.payload
           }
       
           case LOGOUT_DOCTOR:
            return action.payload; 
        default:
           return state
    }
}

export default doctorReducer