import React, { useEffect, useState, useRef } from "react";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import { Link, useHistory, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "../../Signup/Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import ContentHeader from '../../Header/ContentHeader'
import { useSelector } from "react-redux";

import { Form, Input, Select, Tooltip, Button, Space, Typography, Modal } from 'antd';
import { createClinic } from "../../../api/clinic";



import { getProvinces } from '../../../api/province';

const { Option } = Select;



const ClinicsCreate = () => {






    const [provinces, setProvinces] = useState([])
    const [optionValueProvince, setOptionValueProvince] = useState()

    const [searchButtonDisable, setSearchButtonDisable] = useState(true)

    useEffect(() => {
        allProvinces()

    }, [])


    const allProvinces = async () => {
        const res = await getProvinces()
        console.log(res.data.provinces);
        setProvinces(res.data.provinces)
    }


    const handleClick = (e) => {
        console.log(e.target.value);
    }







    const ref = useRef();


    const [formData, setFormData] = useState({
        clinicName: "",
        clinicPhoneNumber: "",
        clinicAddress: "",
        clinicIntroduction: "",
        clinicDesc: "",
        clinicImage: null,
        clinicProvince: null,
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        clinicName,
        clinicPhoneNumber,
        clinicAddress,
        clinicIntroduction,
        clinicDesc,
        clinicImage,
        clinicProvince,
        successMsg,
        errorMsg,
        loading,
    } = formData;
    /****************************
     * EVENT HANDLERS
     ***************************/
    const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));

    let history = useNavigate();
    const handleClinicChange = evt => {

        setFormData({
            ...formData, successMsg: false,
            errorMsg: false,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleClinicImage = evt => {
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
            isEmpty(clinicName
            ) ||
            isEmpty(clinicPhoneNumber) ||
            isEmpty(clinicAddress) ||
            isEmpty(clinicIntroduction) ||
            isEmpty(clinicDesc) ||
            isEmpty(clinicProvince)


        ) {
            setFormData({
                ...formData,
                errorMsg: "All fields are required",
            });
        } else if (clinicImage === null) {
            setFormData({
                ...formData,
                errorMsg: "Image required",
            });
        }
        else {
            console.log("no error");
            let formData = new FormData();

            formData.append('clinicName', clinicName);
            formData.append('clinicPhoneNumber', clinicPhoneNumber);
            formData.append('clinicAddress', clinicAddress);
            formData.append('clinicIntroduction', clinicIntroduction);
            formData.append('clinicDesc', clinicDesc);
            formData.append('clinicImage', clinicImage);
            formData.append('clinicProvince', clinicProvince);

            console.log("readyyyyy to send ", clinicImage);
            setFormData({ ...formData, loading: true });
            //send data to server
            createClinic(formData)
                .then((response) => {
                    console.log("Axios signup success: ", response);
                    setFormData({
                        clinicName: "",
                        clinicPhoneNumber: "",
                        clinicAddress: "",
                        clinicIntroduction: "",
                        clinicDesc: "",
                        clinicImage: null,
                        clinicProvince: null,

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
                            <label htmlFor="name">Clinic name</label>
                            <input type="text" className="form-control" id="name"
                                name="clinicName" value={clinicName} onChange={handleClinicChange}
                                placeholder="Clinic name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone number</label>
                            <input type="text" className="form-control" id="phone" name="clinicPhoneNumber" value={clinicPhoneNumber}
                                onChange={handleClinicChange} placeholder="Phone number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="clinicAddress"
                            value={clinicAddress} onChange={handleClinicChange} placeholder="Address" />
                    </div>
                    <div className="hopitalSearchHosp__div city">
                        <label htmlFor="city"><strong style={{ color: "red" }} >*</strong>Province</label>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            onChange={async (value) => {
/*                                 await setOptionValueProvince(value)
 */                                 await setFormData({ ...formData, clinicProvince: value });


                            }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >

                            {
                                provinces && provinces.map((province) => {
                                    return (
                                        <Option key={province._id} value={province._id} onSelect={(e) => handleClick(e)} >{province.name}</Option>

                                    )
                                })
                            }

                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro-clinic">Introduction</label>
                        <textarea id="intro-clinic" className="form-control" name="clinicIntroduction"
                            value={clinicIntroduction}
                            onChange={handleClinicChange} defaultValue={""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Examination and treatment</label>
                        <textarea id="description" name="clinicDesc" value={clinicDesc} onChange={handleClinicChange}
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
                            name='clinicImage'
                            onChange={handleClinicImage}
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
                    <Link to="/admin/clinics">View Clinics</Link>
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

export default ClinicsCreate