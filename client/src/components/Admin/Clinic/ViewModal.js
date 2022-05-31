import React, { useEffect, useState, useRef } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import "../css/Admin.css"
import { getClinics } from "../../../api/clinic";
import { EditFilled, DeleteFilled } from "@ant-design/icons"
import { Tooltip } from 'antd';
import { Link, useHistory, useNavigate } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { useSelector } from "react-redux";
import "../css/Admin.css"
import { createClinic, getClinic } from "../../../api/clinic";


import { Modal, Button } from 'antd';

const EditModal = ({ visible, setVisible, clinic }) => {



    /* modal */
    const ref = useRef();

    /****************************
     * EVENT HANDLERS
     ***************************/

    let history = useNavigate();



    const resetImage = () => {
        ref.current.value = "";
    };


    const removeDetails = () => {
        setVisible(false)

    }
    return (
        <>
            {/*  <Button type="primary" onClick={() => setVisible(true)}>
                Open Modal of 1000px width
            </Button> */}

            <Modal
                title={clinic?.clinicName}
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={900}
            >

                <div className="row">
                    <div className="col-10 mx-auto">

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Clinic name</label>
                                <input type="text" className="form-control" id="name"
                                    name="clinicName" value={clinic?.clinicName}
                                    placeholder="Clinic name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">Phone number</label>
                                <input type="text" className="form-control" id="phone"
                                    name="clinicPhoneNumber" value={clinic?.clinicPhoneNumber}
                                    placeholder="Phone number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="clinicAddress"
                                value={clinic?.clinicAddress} placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="intro-clinic">Introduction</label>
                            <textarea id="intro-clinic" className="form-control" name="clinicIntroduction"
                                value={clinic?.clinicIntroduction}
                                defaultValue={""} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Examination and treatment</label>
                            <textarea id="description" name="clinicDesc" value={clinic?.clinicDesc}
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
                            <img className='server__images' src={`/uploads/${clinic?.clinicImage}`} alt="hello" />
                        </div>


                    </div>
                </div >
            </Modal>
        </>
    );
};

export default EditModal