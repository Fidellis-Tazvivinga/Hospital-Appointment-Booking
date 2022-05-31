import {LOGGED_IN_CUSTOMERSERVICE,LOGOUT_CUSTOMERSERVICE} from "../constants/customerserviceConstants"


let userState ;
if(window.localStorage.getItem("customerservice")){
  userState = JSON.parse(window.localStorage.getItem("customerservice"))
}else{
  userState = null
}

const customerserviceReducer = (state=userState,action)=>{
    switch (action.type) {
        case LOGGED_IN_CUSTOMERSERVICE:
           return {
               ...state,
               ...action.payload
           }
       
           case LOGOUT_CUSTOMERSERVICE:
            return action.payload; 
        default:
           return state
    }
}

export default customerserviceReducer