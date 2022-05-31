import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { signin } from "../../api/customerservice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  let history = useNavigate();
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    email: "customerservice1@gmail.com",
    password: "123456",
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
          window.localStorage.setItem("customerservice", JSON.stringify(res.data));
          // save user and token to redux
          dispatch({
            type: "LOGGED_IN_CUSTOMERSERVICE",
            payload: res.data,
          });
          history("/customerservice/dashboard");
        }
      } catch (err) {
        console.log("signin api function error: ", err);
        setFormData({
          ...formData,
          loading: false,
          errorMsg: err.res.data.errorMessage,
        });
      }
    };

  };
  /****************************
   * VIEWS
   ***************************/
  const showSigninForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
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
      {/* signin button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signin
        </button>
      </div>
      {/* already have account */}
      <p className="text-center text-white">
        Don't have an account? <Link to="/customerservice/signup">Register here</Link>
      </p>
    </form>
  );

  /****************************
   * RENDERER
   ***************************/
  return (
    <div className="signin-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSigninForm()}
        </div>
      </div>
    </div>
  );
};

export default Signin;