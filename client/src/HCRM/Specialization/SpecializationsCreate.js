import React, { useEffect, useState } from "react";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import { Link, useHistory, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "../../Signup/Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import { createSpecialization } from "../../../api/specialization";
import { useSelector } from "react-redux";


import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';

const { Option } = Select;


const SpecializationsCreate = () => {

    const [formData, setFormData] = useState({
        name: "",

        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        name,
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
            isEmpty(name)

        ) {
            setFormData({
                ...formData,
                errorMsg: "All fields are required",
            });
        } else {
            const { name } = formData;
            const data = { name };

            setFormData({ ...formData, loading: true });
            //send data to server
            createSpecialization(data)
                .then((response) => {
                    console.log("Axios signup success: ", response);
                    setFormData({
                        ...formData,
                        name: "",
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
                            <label for="name">Name</label>
                            <input type="text" class="form-control" onChange={handleChange} id="name" name="name" value={name}
                                placeholder="Full name" />
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
                    <Link to="/admin/specializations">View All Specializations</Link>
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

export default SpecializationsCreate