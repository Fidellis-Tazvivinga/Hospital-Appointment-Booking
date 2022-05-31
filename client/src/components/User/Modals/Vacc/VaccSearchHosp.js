import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../User.css"
import { Modal } from 'antd';
import { Select } from 'antd';
import { SearchOutlined } from "@ant-design/icons"
import { getProvinces } from '../../../../api/province';
import { getHospitalByProvinceApi, getHospitalsBySearch } from '../../../../api/hospital';
const { Option } = Select;

const VaccSearchHosp = ({ vaccinePlace, setHospVisible, vaccineName, visibleHosp }) => {

    const [provinces, setProvinces] = useState([])
    const [optionValueProvince, setOptionValueProvince] = useState()
    const [optionValueHospital, setOptionValueHospital] = useState()
    const [hospitalsByProvince, setHospitalsByProvince] = useState()

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


    const getHospitals = async (value) => {
        const res = await getHospitalByProvinceApi(value)

        if (res.data.hospitals) {

            setHospitalsByProvince(res.data.hospitals)
        } else if (res.data.message) {
            console.log(res.data.message);
        }

    }
    const history = useNavigate()
    const handleSubmit = async (evt) => {

        evt.preventDefault();
        console.log("send data");
        const formData = { optionValueProvince, optionValueHospital /* later on add district and other options */ }
        /* search hospitals */
        const res = await getHospitalsBySearch(formData)
        console.log(res.data.hospitals);
        history(

            '/user/vaccine/search', { state: { hospitals: res.data.hospitals, vaccine: vaccineName } }


        );
    }

    /****************************
     * EVENT HANDLERS
     ***************************/

    const today = new Date()


    return (
        <>


            <Modal

                centered
                visible={visibleHosp}
                onOk={() => setHospVisible(false)}
                onCancel={() => setHospVisible(false)}
                width={750}
                footer={null}
                wrapClassName="vaccModal"
            >


                <div className="vaccinesHospSearch">
                    <h5>Search {vaccinePlace} to take your <strong style={{ color: "#CC0033" }}>{vaccineName && vaccineName} Vaccine</strong>  </h5>

                    <div className="required">
                        <strong style={{ color: "red" }} >* Is required field</strong>
                    </div>
                    <form className='vaccSearchHosp' onSubmit={handleSubmit} >

                        <div className="vaccSearchHosp__div city">
                            <label htmlFor="city"><strong style={{ color: "red" }} >*</strong>City</label>
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange={async (value) => {
                                    await setOptionValueProvince(value)

                                    getHospitals(value)
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

                        <div className="vaccSearchHosp__div district">
                            <label htmlFor="district"><strong style={{ color: "red" }} >*</strong>District</label>
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </div>

                        <div className="vaccSearchHosp__div vacc__Type">
                            <label htmlFor="vacctype"><strong style={{ color: "red" }} >*</strong>Vaccine Type</label>
                            <input type="vacctype" disabled style={{ width: "100%" }} placeholder={`Covid-19 Vaccination (${vaccineName && vaccineName})`} />
                        </div>


                        <div className="vaccSearchHosp__div Hospital">
                            <label htmlFor="city"><strong style={{ color: "red" }} >*</strong>Hospital</label>
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange={(value) => {
                                    setOptionValueHospital(value)
                                }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            /*   filterSort={(optionA, optionB) =>
                                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                              } */
                            >
                                {
                                    hospitalsByProvince && hospitalsByProvince.map((hospital) => {
                                        return (
                                            <>
                                                <Option key={hospital._id} value={hospital._id} > {hospital.hospitalName} </Option>
                                                <Option value="Emaljand"> Emaljan </Option>

                                            </>
                                        )
                                    })


                                }

                            </Select>
                        </div>

                        <div className="vaccSearchHosp__div Hospital">
                            <label htmlFor="city"><strong style={{ color: "red" }} >*</strong>Examination Location</label>
                            <Select
                                disabled
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Does not matter"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </div>

                    </form>

                    <div className="submit__btn">
                        <button type='submit' onClick={handleSubmit}>
                            <SearchOutlined className='search__icon' />
                            Search Appointment
                        </button>
                    </div>


                </div>

            </Modal>
        </>
    );
};

export default VaccSearchHosp