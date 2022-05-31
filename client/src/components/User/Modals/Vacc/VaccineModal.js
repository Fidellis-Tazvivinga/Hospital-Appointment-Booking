import React, { useState } from 'react'
import "../../User.css"
import { Modal } from 'antd';
import VaccinePlace from "./VaccinePlace"
const VaccineModal = ({ visible, setVisible }) => {


    /****************************
     * EVENT HANDLERS
     ***************************/
    const today = new Date()
    const [vaccineName, setVaccineName] = useState()
    const [visibleVacc, setVisibleVacc] = useState(false)

    const handleVaccines = (e) => {
        setVisible(false)
        console.log(e.target.value);
        setVaccineName(e.target.value)
        setVisibleVacc(true)
    }

    return (
        <>


            <Modal
                title="Information"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={400}
                footer={null}
                wrapClassName="vaccModal"
            >


                <div className="vaccines">
                    <p>You have rights to the following type of vaccines</p>
                    <div className="vaccines__list">
                        <ul>
                            <li>Biontech</li>
                            <li>Sinovac</li>
                            <li>AstraZeneca</li>
                        </ul>
                    </div>
                    <p>The Earliest Date Ypu Can Get Vaccineted: <strong>  {`${today.getDate() + ' ' + (today.toLocaleString("en-US", { month: "long" })) + ' ' + today.getFullYear()}  `}
                    </strong> </p>
                    <p>Right to Vaccination at Home : {`N/A`} </p>


                    <div className="vaccines__btns">
                        <button value="Biontech" onClick={(e) => handleVaccines(e)}>Biontech</button>
                        <button value="Sinovac" onClick={(e) => handleVaccines(e)} >Sinovac</button>
                        <button value="Turkovac" onClick={(e) => handleVaccines(e)} >Turkovac</button>
                    </div>
                </div>

            </Modal>
            <VaccinePlace vaccineName={vaccineName} visibleVacc={visibleVacc} setVisibleVacc={setVisibleVacc} />
        </>
    );
};

export default VaccineModal