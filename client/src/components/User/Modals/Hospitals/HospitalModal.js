import React, { useState } from 'react'

import { Modal } from 'antd';
import "../../User.css"
import HospitalSearch from './HospitalSearch';
const HospitalModal = ({ visible3, setVisible3 }) => {


    /****************************
     * EVENT HANDLERS
     ***************************/
    const [visibleHosp, setVisibleHosp] = useState(false)
    const handleSearch = (e) => {
        setVisible3(false)

        setVisibleHosp(true)
    }
    const handleSearchByLocation = () => {
        // search by user location
    }
    return (
        <>


            <Modal

                centered
                visible={visible3}
                onOk={() => setVisible3(false)}
                onCancel={() => setVisible3(false)}
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
            <HospitalSearch visibleHosp={visibleHosp} setVisibleHosp={setVisibleHosp} />

        </>
    );
};

export default HospitalModal