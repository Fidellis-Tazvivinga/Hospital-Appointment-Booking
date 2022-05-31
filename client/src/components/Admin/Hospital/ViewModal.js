import React, { useEffect, useState, useRef } from 'react'
import MainDashboardLayout from "../../MainDashboard/LayoutCompo"
import ContentHeader from '../../Header/ContentHeader'
import "../css/Admin.css"
import { gethospitals } from "../../../api/hospital";
import { EditFilled, DeleteFilled } from "@ant-design/icons"
import { Tooltip } from 'antd';
import { Link, useHistory, useNavigate } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { showLoading } from "../../../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { useSelector } from "react-redux";
import "../css/Admin.css"



import { Modal, Button } from 'antd';

const ViewModal = ({ visible, setVisible, hospital }) => {



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
                title={hospital?.hospitalName}
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
                                <label htmlFor="name">hospital name</label>
                                <input type="text" className="form-control" id="name"
                                    name="hospitalName" value={hospital?.hospitalName}
                                    placeholder="hospital name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">Phone number</label>
                                <input type="text" className="form-control" id="phone"
                                    name="hospitalPhoneNumber" value={hospital?.hospitalPhoneNumber}
                                    placeholder="Phone number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="hospitalAddress"
                                value={hospital?.hospitalAddress} placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="intro-hospital">Introduction</label>
                            <textarea id="intro-hospital" className="form-control" name="hospitalIntroduction"
                                value={hospital?.hospitalIntroduction}
                                defaultValue={""} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Examination and treatment</label>
                            <textarea id="description" name="hospitalDesc" value={hospital?.hospitalDesc}
                                className="form-control" defaultValue={""} />
                        </div>
                        {/*  <div className="form-group">
                    <label htmlFor="image-hospital">Update images</label>
                    <input type="file" id="image-hospital" accept="image/*" onchange="loadFile(event)" />
                </div> */}
                        {/* <div className="form-group">
                    <img className="img-preview-hospital-create d-none" id="image-preview" />
                </div> */}
                        <div className='form-group'>
                            <img className='server__images' src={`/uploads/${hospital?.hospitalImage}`} alt="hello" />
                        </div>


                    </div>
                </div >
            </Modal>
        </>
    );
};

export default ViewModal