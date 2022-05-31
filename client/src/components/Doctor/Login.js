import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { signin } from "../../api/doctor";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Signin = () => {
  let history = useNavigate();


  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    email: "doctor6@gmail.com",
    password: "test123456",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  /****************************
   * EVENT HANDLERS
   ***************************/

  const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    if (auth && auth.user.role == 0) {
      history("/user/dashboard");
    } else if (authDoctor && authDoctor.doctor.role == 1) {
      history("/doctor/dashboard");
    }
    else if (customerservice && customerservice.customerservice.role == 2) {
      history("/customerservice/dashboard");
    }
    else if (auth && auth.user.role == 3) {
      history("/admin/dashboard");
    }
  }, [history]);









  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required....",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid emaillllllll",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });


      console.log("SEND LOGIN DATA", { email, password });

      try {
        let res = await signin(data);

        if (res.data) {

          // save user and token to local storage
          window.localStorage.setItem("doctor", JSON.stringify(res.data));
          // save user and token to redux
          dispatch({
            type: "LOGGED_IN_DOCTOR",
            payload: res.data,
          });
          history("/doctor/dashboard");
        }
      } catch (err) {
        console.log("signin api function error: ", err);
        setFormData({
          ...formData,
          loading: false,
          errorMsg: "invalid creds",
        });
      }
    };

  };

  /****************************
   * VIEWS
   ***************************/
  const showSigninForm = () => (
    <>


      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Your email address:</label>
          <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Email" onChange={handleChange} />
        </div>
        <div className="form-group forgot-password" >
          <label htmlFor="password">Your password:</label>
          <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={handleChange} />
        </div>
        <div className="forgot-password">
          <a href="#" data-toggle="modal" data-target="#forgotPasswordModal">Forgotten password???</a>
          <p className="">
            Don't have an account? <Link to="/doctor/signup">Register here</Link>
          </p>
        </div>
        <button type="submit" style={{ backgroundColor: "blue", padding: "5px 10px", textAlign: "center", color: "white", borderRadius: "10px" }} className="btn  btn-login">LOG IN</button>
      </form>
      <br />
      <hr />
      <a className="lg-register" href="/"><i className="fa fa-arrow-left" aria-hidden="true" />  Back to the hompage</a> <br />
      <a title="Click to view my Youtube channel" className="lg-register" target="_blank" href="#"><i style={{ color: 'orange' }} className="fa fa-comments" aria-hidden="true" /> Having problems Login .Contact Us</a><br />
      <a title="Click to view my Facebook Page" className="lg-register" target="_blank" href="#"> <i style={{ color: 'red' }} className="fa fa-heart" aria-hidden="true" /> View Our Facebook Page</a>




    </>
  );

  /****************************
   * RENDERER
   ***************************/
  return (
    <>


      <div className="signin-container">
        <div className=" vh-100">
          <div className="" style={{ display: "flex", justifyContent: "space-around", alignContent: "center" }}>
            <div className="backgroundImg" style={{
              backgroundImage: "url(" + "/images/background/header-cover.jpg" + ")",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              flex: "0.5",
              height: "90vh",
              alignSelf: "center"

            }}>

            </div>
            <div className="login-form" style={{ flex: "0.5", alignSelf: "center", marginLeft: "30px" }}>
              {errorMsg && showErrorMsg(errorMsg)}
              {loading && <div className="text-center pb-4">{showLoading()}</div>}
              {showSigninForm()}



            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Signin;