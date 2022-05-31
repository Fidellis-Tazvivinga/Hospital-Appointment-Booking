import React, { useState } from 'react'
import "../../User.css"
import { Modal } from 'antd';
import VaccSearchHosp from './VaccSearchHosp';
import VaccSearchClinic from './VaccSearchClinic';
const VaccinePlace = ({ visibleVacc, setVisibleVacc, vaccineName }) => {


    /****************************
     * EVENT HANDLERS
     ***************************/

    const today = new Date()
    const [vaccinePlace, setVaccPlaceName] = useState()
    /*  const [visibleVacc, setVisibleVacc] = useState(false) */
    const [visibleHosp, setHospVisible] = useState(false)
    const [visibleClinic, setClinicVisible] = useState(false)




    const handleVaccHospital = (e) => {

        setVisibleVacc(false)
        console.log(e.target.value);
        setVaccPlaceName(e.target.value)
        setHospVisible(true)
    }
    const handleVaccClinic = (e) => {

        setVisibleVacc(false)
        console.log(e.target.value);
        setVaccPlaceName(e.target.value)
        setClinicVisible(true)
    }

    return (
        <>


            <Modal

                centered
                visible={visibleVacc}
                onOk={() => setVisibleVacc(false)}
                onCancel={() => setVisibleVacc(false)}
                width={400}
                footer={null}
                wrapClassName="vaccModal"
            >


                <div className="vaccines">
                    <h5>Make a Covid-19 <strong style={{ color: "#CC0033" }}>{vaccineName && vaccineName}</strong> Vaccine Appointment </h5>

                    <p>You can make a vaccination appointment for the vaccine type you choose from the options below.</p>

                    <div className="vacchospital__btns">
                        <button className='vaccClinic' value="Clinic" onClick={(e) => handleVaccClinic(e)}>From Clinic</button>
                        <button value="Hospital" onClick={(e) => handleVaccHospital(e)}>From Hospital</button>


                    </div>

                </div>

            </Modal>
            <VaccSearchHosp vaccineName={vaccineName} setHospVisible={setHospVisible} vaccinePlace={vaccinePlace} visibleHosp={visibleHosp} />
            <VaccSearchClinic vaccineName={vaccineName} setClinicVisible={setClinicVisible} vaccinePlace={vaccinePlace} visibleClinic={visibleClinic} />

        </>
    );
};

export default VaccinePlace