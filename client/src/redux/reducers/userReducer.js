import {LOGGED_IN_USER,LOGOUT_USER} from "../constants/authConstants"

//so that when the token is still valid,then redux can store the data 
let userState ;
if(window.localStorage.getItem("user")){
  userState = JSON.parse(window.localStorage.getItem("user"))
}else{
  userState = null
}

const userReducer = (state=userState,action)=>{
    switch (action.type) {
        case LOGGED_IN_USER:
           return {
               ...state,
               ...action.payload
           }
       
           case LOGOUT_USER:
            return action.payload; 
        default:
           return state
    }
}

export default userReducer