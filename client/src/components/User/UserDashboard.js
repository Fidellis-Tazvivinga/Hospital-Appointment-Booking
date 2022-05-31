import React from "react";
import Header from "./Header";
import Main from "./Main";


//import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

  //const { auth } = useSelector((state) => ({ ...state }));
  //const history = useNavigate()
  /* useEffect(() => {
    if (auth === null) {
      history("/login")
    }
  }, [auth]) */

  return (
    <>
      <Header />
      <Main />
    </>
  )
};

export default UserDashboard;




