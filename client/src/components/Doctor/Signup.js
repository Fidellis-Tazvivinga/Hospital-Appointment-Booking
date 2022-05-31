import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "../Signup/Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { signup } from "../../api/doctor";
import { useSelector } from "react-redux";

import { getHospitalsApi } from "../../api/hospital";
import { getClinicsApi } from "../../api/clinic";
import { getSpecializations } from "../../api/specialization";
import DoctorImage from "./DoctorImage"
/****************************
 * When Doctors SignUp their request will be pending so that they get verified if they are truly a doctor or not
 ***************************/





const Signup = () => {




  const [hospitals, setHospitals] = useState()
  const [clinics, setClinics] = useState()
  const [specializations, setSpecializations] = useState()
  useEffect(() => {


    loadHospitals()
    loadClinics()
    loadSpecializations()
  }, [])
  /*  useEffect(async () => {
     const res2 = await getSpecializations()
     setSpecializations(res2.data)
   }, [specializations])
  */
  const loadHospitals = async () => {
    const res = await getHospitalsApi()
    setHospitals(res.data.hospitals)

  }
  const loadClinics = async () => {
    const res = await getClinicsApi()
    setClinics(res.data.clinics)

  }
  const loadSpecializations = async () => {
    const res = await getSpecializations()
    setSpecializations(res.data.specializations)

  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    password: "",
    password2: "",
    phoneNumber: "",
    address: "",
    hospital: "",
    clinic: "",
    description: "",
    doctorImages: {},
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    name,
    email,
    specialization,
    password,
    password2,
    phoneNumber,
    address,
    hospital,
    clinic,
    description,
    doctorImages,
    successMsg,
    errorMsg,
    loading,
  } = formData;


  const [images, setImages] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [

    ],
  })

  /****************************
   * EVENT HANDLERS
   ***************************/

  const ref = useRef();



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



  const handleDoctorImage = evt => {
    console.log(evt.target.files[0]);
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.files[0],
    });
  };
  const resetImage = () => {
    ref.current.value = "";
  };


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
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2) ||
      isEmpty(phoneNumber) ||
      isEmpty(address) ||
      isEmpty(hospital) ||
      isEmpty(clinic) ||
      isEmpty(description) ||

      isEmpty(specialization)
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
      const { name, email, specialization, password, phoneNumber, address, hospital, clinic, description } = formData;

      const doctorImgs = images?.fileList

      let dataImages = []
      doctorImgs.map((img) => {
        dataImages.push(img.originFileObj)
      })
      const data = { name, email, specialization, dataImages, password, phoneNumber, address, hospital, clinic, description };

      setFormData({ ...formData, loading: true });
      console.log("fileList", dataImages);

      //send data to server
      signup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            name: "",
            email: "",
            specialization: "",
            password: "",
            password2: "",
            phoneNumber: "",
            address: "",
            hospital: "",
            clinic: "",
            description: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
          resetImage()
          /*  setHospitals()
           setSpecializations() */
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
    <div class="row">
      <div class="col-10 mx-auto">
        <form id="formCreateNewDoctor" onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Full name</label>
              <input type="text" class="form-control" id="name" name="name" value={name} onChange={handleChange} placeholder="Full name" />
            </div>
            <div class="form-group col-md-6">
              <label for="phone">Phone number</label>
              <input type="text" class="form-control" id="phone" name="phoneNumber" value={phoneNumber} onChange={handleChange} placeholder="Phone number" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
            </div>
            <div class="form-group col-md-6">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
            </div>
            <div class="form-group col-md-6">
              <label for="password">Password2</label>
              <input type="password" class="form-control" id="password" name="password2" value={password2} onChange={handleChange} placeholder="Password" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="clinic">Belong to a Hospital</label>
              <select id="clinic" class="form-control" name="hospital" onChange={handleChange}>
                <option selected >Select the Hospital</option>

                <option value="none">I dont work at a Hospital</option>

                {hospitals &&
                  hospitals.map(c => {
                    return (
                      <>

                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.hospitalName}
                        </option>
                      </>
                    )
                  }

                  )}
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="clinic">Belong to a Clinic</label>
              <select id="clinic" class="form-control" name="clinic" onChange={handleChange}>
                <option selected >Select the Clinic</option>

                <option value="none">I dont work at a Clinic</option>
                {clinics &&
                  clinics.map(c => {
                    return (
                      <>

                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.clinicName}
                        </option>
                      </>
                    )
                  }

                  )}
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="specialization">Specialist</label>
              <select id="specialization" class="form-control" name="specialization" onChange={handleChange}>
                <option selected>Choose a specialist</option>
                {/*  <option key="4">cerahi</option>
                <option key="5">kulak</option>
                <option key="6">boğaz</option> */}
                {specializations &&
                  specializations.map(c => {
                    return (
                      <>
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.name}
                        </option>
                      </>
                    )
                  })}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" name="address" value={address} onChange={handleChange} placeholder="Address" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" name="description" value={description} onChange={handleChange}></textarea>
          </div>


          {/* 
          <div className='form-group'>
            <input
              type='file'
              id="image-doctor"
              name='doctorImage'
              onChange={handleDoctorImage}

            />

          </div>
 */}
          <DoctorImage state={images} setState={setImages} />

          <button type="submit" class="btn btn-primary" id="createNewDoctor">Create</button>
          {/* already have account */}
          <p className="text-center text-white">
            Have an account? <Link to="/doctor/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>


  );

  /****************************
   * RENDERER
   ***************************/
  return (
    <div className="">
      <div className="">
        <div className="">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="">{showLoading()}</div>}
          {showSignupForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;