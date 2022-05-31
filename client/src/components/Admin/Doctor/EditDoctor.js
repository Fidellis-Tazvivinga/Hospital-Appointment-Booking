import React, { useEffect, useState, useRef } from "react";
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import { Link, useHistory, useNavigate, useParams } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import "../../Signup/Signup.css";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import ContentHeader from '../../Header/ContentHeader'
import { useDispatch, useSelector } from "react-redux";
import "../css/Admin.css"
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
/* import { getClinic } from "../../../redux/actions/clinicActions"; */
import { createDoctor, editDoctorApi, getEachDoctorApi } from "../../../api/doctor";

const { Option } = Select;


const EditDoctor = () => {

    const ref = useRef();
    const { doctorId } = useParams()

    /* 
        const dispatch = useDispatch()
        useEffect(() => {
    
            dispatch(getClinic(clinicId));
     
    
        }, [dispatch, clinicId]); */
    const editDoctor = async (id) => {

        //get the clinic
        const doctorId = id
        const res = await getEachDoctorApi(doctorId)
        const data = res.data.doctor
        setFormData({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            specialization: data.specialization,
            hospital: data.hospital,
            address: data.address,
            description: data.description,
            errorMsg: false,
            loading: false,

        });
    }

    useEffect(() => {
        editDoctor(doctorId)

    }, [doctorId])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        specialization: "",

        phoneNumber: "",
        address: "",
        hospital: "",
        description: "",
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        name,
        email,
        specialization,

        phoneNumber,
        address,
        hospital,
        description,
        successMsg,
        errorMsg,
        loading,
    } = formData;
    /****************************
     * EVENT HANDLERS
     ***************************/
    const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));

    let history = useNavigate();
    const handleDoctorChange = evt => {

        setFormData({
            ...formData, successMsg: false,
            errorMsg: false,
            [evt.target.name]: evt.target.value,
        });
    };

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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("sendding data");
        // client-side validation
        if (
            isEmpty(name) ||
            isEmpty(email) ||

            isEmpty(phoneNumber) ||
            isEmpty(address) ||
            isEmpty(hospital) ||
            isEmpty(description) ||

            isEmpty(specialization)

        ) {
            setFormData({
                ...formData,
                errorMsg: "All fields are required",
            });
        }/*  else if (doctorImage === null) {
            setFormData({
                ...formData,
                errorMsg: "Image required",
            });
        } */
        else {
            console.log("no error");

            console.log(formData);
            //send data to server
            editDoctorApi(doctorId, formData)
                .then((response) => {
                    console.log("Axios signup success: ", response);
                    setFormData({

                        ...formData,
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
        <div className="row">
            <div className="col-10 mx-auto">
                {/*                 <img className="server__images" src={`/uploads/${doctorImage && doctorImage}`} alt="hello" />
 */}                <form id="formCreateNewdoctor" onSubmit={handleSubmit} >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">doctor name</label>
                            <input type="text" className="form-control" id="name"
                                name="name" value={name} onChange={handleDoctorChange}
                                placeholder="doctor name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Email</label>
                            <input type="text" className="form-control" id="email"
                                name="email" value={email} onChange={handleDoctorChange}
                                placeholder="doctor name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone number</label>
                            <input type="text" className="form-control" id="phone" name="phoneNumber" value={phoneNumber}
                                onChange={handleDoctorChange} placeholder="Phone number" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Hospital</label>
                            <input type="text" className="form-control" id="hospital" name="hospital" value={hospital}
                                onChange={handleDoctorChange} placeholder="Hospital" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Specialization</label>
                            <input type="text" className="form-control" id="specialization" name="specialization" value={specialization}
                                onChange={handleDoctorChange} placeholder="Specialization" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="address"
                            value={address} onChange={handleDoctorChange} placeholder="Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro-clinic">Description</label>
                        <textarea id="intro-doctor" className="form-control" name="description"
                            value={description}
                            onChange={handleDoctorChange} defaultValue={""} />
                    </div>

                    {/*  <div className="form-group">
                        <label htmlFor="image-clinic">Update images</label>
                        <input type="file" id="image-clinic" accept="image/*" onchange="loadFile(event)" />
                    </div> */}
                    {/* <div className="form-group">
                        <img className="img-preview-clinic-create d-none" id="image-preview" />
                    </div> */}
                    {/*  <div className='form-group'>
                        <input
                            type='file'
                            id="image-clinic"
                            name='doctorImage'
                            onChange={handledoctorImage}


                        />

                    </div> */}
                    <button type="submit" className="btn btn-primary" id="createNewdoctor">Update</button>
                </form>
            </div>
        </div >


    )

    return (
        <div>
            <MainDashboardLayout>
                <div className="container" >
                    <Link to="/admin/doctors">View Doctors</Link>
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

export default EditDoctor