import React, { useEffect, useState } from "react";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import { Link, useHistory, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "../../Signup/Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import { signup } from "../../../api/customerservice";
import { useSelector } from "react-redux";
import { getHospitalsApi } from "../../../api/hospital";
import { getSpecializations } from "../../../api/specialization";


import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';

const { Option } = Select;


const SupporterCreate = () => {



    const [hospitals, setHospitals] = useState()
    const [specializations, setSpecializations] = useState()
    useEffect(() => {


        loadHospitals()
        loadSpecializations()
    }, [])

    const loadHospitals = async () => {
        const res = await getHospitalsApi()
        setHospitals(res.data.hospitals)

    }
    const loadSpecializations = async () => {
        const res = await getSpecializations()
        setSpecializations(res.data.specializations)

    }

    const [formData, setFormData] = useState({
        username: "customerservice3",
        email: "customerservice3@gmail.com",
        password: "123456",
        password2: "123456",

        phoneNumber: "+905371625372",
        specialization: "",
        hospital: "",
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        username,
        email,
        password,
        password2,
        phoneNumber,
        specialization,
        hospital,
        successMsg,
        errorMsg,
        loading,
    } = formData;
    /****************************
     * EVENT HANDLERS
     ***************************/



    const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));


    let history = useNavigate();



    const onFinish = values => {
        console.log('Received values of form: ', values);
    }


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
            isEmpty(password2) ||
            isEmpty(phoneNumber) ||
            isEmpty(specialization) ||
            isEmpty(hospital)

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
            const { username, email, password, phoneNumber, hospital, specialization } = formData;
            const data = { username, email, password, phoneNumber, hospital, specialization };

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
                        phoneNumber: "",
                        hospital: "",
                        specialization: "",
                        loading: false,
                        successMsg: response.data.successMessage,
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



    const showSignupForm = () => (
        <div class="row">
            <div class="col-10 mx-auto">
                <form id="formCreateNewDoctor" onSubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="name">Full name</label>
                            <input type="text" class="form-control" id="name" name="username" value={username} onChange={handleChange} placeholder="Full name" />
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
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" value={password2} onChange={handleChange} placeholder="Password" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="clinic">Belong to a Hospital</label>
                            <select id="clinic" class="form-control" name="hospital" onChange={handleChange}>
                                <option selected >Select the Hospital</option>
                                {/*  <option key="1">Para1</option>
                <option key="2">para2</option>
                <option key="3">para3</option> */}
                                {hospitals &&
                                    hospitals.map(c => {
                                        return (
                                            <option
                                                key={c._id}
                                                value={c.hospitalName}
                                            >
                                                {c.hospitalName}
                                            </option>
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
                                            <option
                                                key={c._id}
                                                value={c.name}
                                            >
                                                {c.name}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>


                    <button type="submit" class="btn btn-primary" id="createNewDoctor">Create</button>
                </form>
            </div>
        </div>
    )

    return (
        <div>
            <MainDashboardLayout>
                <div className="container" >
                    <Link to="/admin/supporters">View All Supporters</Link>
                </div>
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
            </MainDashboardLayout>
        </div>
    )
}

export default SupporterCreate