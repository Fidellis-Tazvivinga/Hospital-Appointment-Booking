import React from 'react'

import { Modal } from 'antd';

const DoctorModal = ({ visible2, setVisible2 }) => {


    /****************************
     * EVENT HANDLERS
     ***************************/


    return (
        <>


            <Modal
                title="hospital"
                centered
                visible={visible2}
                onOk={() => setVisible2(false)}
                onCancel={() => setVisible2(false)}
                width={900}

            >

                <div className="row">
                    <div className="col-10 mx-auto">

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">hospital name</label>
                                <input type="text" className="form-control" id="name"
                                    name="hospitalName" value="hospital"
                                    placeholder="hospital name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">Phone numbers</label>
                                <input type="text" className="form-control" id="phone"
                                    name="hospitalPhoneNumber" value="hospital"
                                    placeholder="Phone number" />
                            </div>
                        </div>




                    </div>
                </div >
            </Modal>
        </>
    );
};

export default DoctorModal