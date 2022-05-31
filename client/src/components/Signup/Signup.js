import React, { useEffect, useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "./Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { signup } from "../../api/auth";
import { useSelector } from "react-redux";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;
  /****************************
   * EVENT HANDLERS
   ***************************/


  const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));


  let history = useNavigate();

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

    //console.log(evt);
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      /* so that the error messages disappear as the user starts typing */
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });
      //send data to server
      signup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: "You have registered.Please Login",
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  /****************************
   * VIEWS
   ***************************/
  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      {/* username */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input
          name="username"
          value={username}
          className="form-control"
          placeholder="Username"
          type="text"
          onChange={handleChange}
        />
      </div>
      {/* email */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          name="email"
          value={email}
          className="form-control"
          placeholder="Email address"
          type="email"
          onChange={handleChange}
        />
      </div>
      {/* password */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Create password"
          type="password"
          onChange={handleChange}
        />
      </div>
      {/* password2 */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password2"
          value={password2}
          className="form-control"
          placeholder="Confirm password"
          type="password"
          onChange={handleChange}
        />
      </div>
      {/* signup button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>
      {/* already have account */}
      <p className="text-center text-white">
        Have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );


  const showSignUpForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit} noValidate>
          {/* username */}
          <div className="form-group ">
            <label htmlFor="username">Full Name</label>
            <input
              name="username"
              value={username}
              className="form-control"
              placeholder="Enter your Full Name ..."
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your email address:</label>
            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Email" onChange={handleChange} />
          </div>
          <div className="form-group forgot-password" >
            <label htmlFor="password">Your password:</label>
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm password:</label>
            <input
              name="password2"
              value={password2}
              className="form-control"
              placeholder="Confirm password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="forgot-password">
            <a href="#" data-toggle="modal" data-target="#forgotPasswordModal">Forgotten password???</a>
            <p className="">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <button type="submit" className="btn__register">Register</button>
        </form>
        <br />
        <hr />
        <a className="lg-register" href="/"><i className="fa fa-arrow-left" aria-hidden="true" />  Back to the hompage</a> <br />
        <a title="Click to view my Youtube channel" className="lg-register" target="_blank" href="#"><i style={{ color: 'orange' }} className="fa fa-comments" aria-hidden="true" /> Having problems Login .Contact Us</a><br />
        <a title="Click to view my Facebook Page" className="lg-register" target="_blank" href="#"> <i style={{ color: 'red' }} className="fa fa-heart" aria-hidden="true" /> View Our Facebook Page</a>



      </>
    )
  }
  /****************************
   * RENDERER
   ***************************/
  return (
    <>
      {/*  <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSignupForm()}
         
        </div>
      </div>
    </div>  */}

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
              {successMsg && showSuccessMsg(successMsg)}

              {loading && <div className="text-center pb-4">{showLoading()}</div>}
              {showSignUpForm()}



            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Signup;