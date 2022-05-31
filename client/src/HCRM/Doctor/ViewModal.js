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

const ViewModal = ({ visible, setVisible, doctor }) => {



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
                title={doctor?.name}
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
                                <label htmlFor="name">Doctor Name</label>
                                <input type="text" className="form-control" id="name"
                                    name="name" value={doctor?.name}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email"
                                    name="email" value={doctor?.email}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">Phone number</label>
                                <input type="text" className="form-control" id="phone"
                                    name="phoneNumber" value={doctor?.phoneNumber}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="hospital">Hospital</label>
                                <input type="text" className="form-control" id="phone"
                                    name="hospital" value={doctor?.hospital}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">Specialization</label>
                                <input type="text" className="form-control" id="phone"
                                    name="specialization" value={doctor?.specialization}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="address"
                                value={doctor?.address} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="intro-hospital">Description</label>
                            <textarea id="intro-hospital" className="form-control" name="description"
                                value={doctor?.description}
                                defaultValue={""} />
                        </div>

                        {/*  <div className="form-group">
                    <label htmlFor="image-hospital">Update images</label>
                    <input type="file" id="image-hospital" accept="image/*" onchange="loadFile(event)" />
                </div> */}
                        {/* <div className="form-group">
                    <img className="img-preview-hospital-create d-none" id="image-preview" />
                </div> */}
                        {/* <div className='form-group'>
                            <img className='server__images' src={`/uploads/${doctor?.name}`} alt="hello" />
                        </div> */}


                    </div>
                </div >
            </Modal>
        </>
    );
};

export default ViewModal