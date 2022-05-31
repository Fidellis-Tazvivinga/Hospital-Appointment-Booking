import React, { useEffect, useState, useRef } from "react";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import { Link, useHistory, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "../../Signup/Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";

import { useSelector } from "react-redux";

import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
import { createHospital } from "../../../api/hospital";

const { Option } = Select;


const HospitalCreate = () => {

    const ref = useRef();


    const [formData, setFormData] = useState({
        hospitalName: "",
        hospitalPhoneNumber: "",
        hospitalAddress: "",
        hospitalIntroduction: "",
        hospitalDesc: "",
        hospitalImage: null,
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        hospitalName,
        hospitalPhoneNumber,
        hospitalAddress,
        hospitalIntroduction,
        hospitalDesc,
        hospitalImage,
        successMsg,
        errorMsg,
        loading,
    } = formData;
    /****************************
     * EVENT HANDLERS
     ***************************/
    const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));

    let history = useNavigate();
    const handleHospitalChange = evt => {

        setFormData({
            ...formData, successMsg: false,
            errorMsg: false,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleHopitalImage = evt => {
        console.log(evt.target.files[0]);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.files[0],
        });
    };
    const resetImage = () => {
        ref.current.value = "";
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("sendding data");
        // client-side validation
        if (
            isEmpty(hospitalName
            ) ||
            isEmpty(hospitalPhoneNumber) ||
            isEmpty(hospitalAddress) ||
            isEmpty(hospitalIntroduction) ||
            isEmpty(hospitalDesc)


        ) {
            setFormData({
                ...formData,
                errorMsg: "All fields are required",
            });
        } else if (hospitalImage === null) {
            setFormData({
                ...formData,
                errorMsg: "Image required",
            });
        }
        else {
            console.log("no error");
            let formData = new FormData();

            formData.append('hospitalName', hospitalName);
            formData.append('hospitalPhoneNumber', hospitalPhoneNumber);
            formData.append('hospitalAddress', hospitalAddress);
            formData.append('hospitalIntroduction', hospitalIntroduction);
            formData.append('hospitalDesc', hospitalDesc);
            formData.append('hospitalImage', hospitalImage);

            console.log("readyyyyy to send ");
            setFormData({ ...formData, loading: true });
            //send data to server
            createHospital(formData)
                .then((response) => {
                    console.log("Axios signup success: ", response);
                    setFormData({
                        hospitalName: "",
                        hospitalPhoneNumber: "",
                        hospitalAddress: "",
                        hospitalIntroduction: "",
                        hospitalDesc: "",
                        hospitalImage: null,

                        errorMsg: false,
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
                    resetImage()
                })
                .catch((err) => {
                    console.log("Axios signup error: ", err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                    resetImage()
                });
        }
    };



    const showSignupForm = () => (
        <div className="row">
            <div className="col-10 mx-auto">
                <form id="formCreateNewClinic" onSubmit={handleSubmit} >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Hospital name</label>
                            <input type="text" className="form-control" id="name"
                                name="hospitalName" value={hospitalName} onChange={handleHospitalChange}
                                placeholder="Hospital name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone number</label>
                            <input type="text" className="form-control" id="phone" name="hospitalPhoneNumber" value={hospitalPhoneNumber} onChange={handleHospitalChange} placeholder="Phone number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="hospitalAddress"
                            value={hospitalAddress} onChange={handleHospitalChange} placeholder="Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro-clinic">Introduction</label>
                        <textarea id="intro-clinic" className="form-control" name="hospitalIntroduction"
                            value={hospitalIntroduction}
                            onChange={handleHospitalChange} defaultValue={""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Examination and treatment</label>
                        <textarea id="description" name="hospitalDesc" value={hospitalDesc} onChange={handleHospitalChange}
                            className="form-control" defaultValue={""} />
                    </div>
                    {/*  <div className="form-group">
                        <label htmlFor="image-clinic">Update images</label>
                        <input type="file" id="image-clinic" accept="image/*" onchange="loadFile(event)" />
                    </div> */}
                    {/* <div className="form-group">
                        <img className="img-preview-clinic-create d-none" id="image-preview" />
                    </div> */}
                    <div className='form-group'>
                        <input
                            type='file'
                            id="image-clinic"
                            name='hospitalImage'
                            onChange={handleHopitalImage}
                            ref={ref}
                        />

                    </div>
                    <button type="submit" className="btn btn-primary" id="createNewClinic">Create</button>
                </form>
            </div>
        </div >


    )

    return (
        <div>
            <MainDashboardLayout>
                <div className="container" >
                    <Link to="/admin/hospitals">View Hospitals</Link>
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

export default HospitalCreate