import React, { useState, useRef } from 'react'

import { Modal } from 'antd';

import "../../User.css"
import ClinicSearch from './ClinicSearch';
const ClinicModal = ({ visible2, setVisible2 }) => {


    /****************************
     * EVENT HANDLERS
     ***************************/
    const [visibleHosp, setVisibleHosp] = useState(false)
    const handleSearch = (e) => {
        setVisible2(false)

        setVisibleHosp(true)
    }
    const handleSearchByLocation = () => {
        // search by user location
        //get user location ,province,city,and district then send to back end for a search

    }
    return (
        <>


            <Modal

                centered
                visible={visible2}
                onOk={() => setVisible2(false)}
                onCancel={() => setVisible2(false)}
                width={400}
                footer={false}
            >
                <div className="select__search__type">
                    <h5>Select Search Type</h5>
                    <div className="select__search__links">
                        <button onClick={handleSearch} className='select__search__link__one' to="/user/hospital/search">
                            General Search
                        </button>
                        <button onClick={handleSearchByLocation} className='select__search__link__two' to="#">
                            Search By Location
                        </button>
                    </div>
                </div>

            </Modal>
            <ClinicSearch visibleHosp={visibleHosp} setVisibleHosp={setVisibleHosp} />

        </>
    );
};

export default ClinicModal