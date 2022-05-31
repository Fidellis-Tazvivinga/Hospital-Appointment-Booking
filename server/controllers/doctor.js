const Doctor = require("../models/Doctor")

exports.list = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).populate("specialization").populate("hospital")
        if (!doctors) {
            return res.json({ message: "No Doctors Found" })
        }
        res.json({ doctors });
    } catch (err) {
        console.log(err, 'Controller.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.listBySearch = async (req, res) => {

    const { optionValueHospital, optionValueSpecialization } = req.body
    try {

        const doctors = await Doctor.find({ specialization: optionValueSpecialization, hospital: { _id: optionValueHospital } }).populate("hospital").populate("specialization")


        console.log(doctors);

        if (!doctors) {
            console.log("hospital not found");
            res.json({ message: "Hospital Not found in this Province" });

        }
        res.json({ doctors });
    } catch (err) {
        console.log(err, 'hospitalsController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.listBySearchClinic = async (req, res) => {

    const { optionValueClinic, optionValueSpecialization } = req.body
    try {

        const doctors = await Doctor.find({ specialization: optionValueSpecialization, clinic: { _id: optionValueClinic } }).populate("clinic").populate("specialization")


        console.log(doctors);

        if (!doctors) {
            console.log("clinic not found");
            res.json({ message: "clinic Not found in this Province" });

        }
        res.json({ doctors });
    } catch (err) {
        console.log(err, 'clinicsController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.update = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, req.body)

        res.json({ successMessage: `${doctor.name} was successfully edited` });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.read = async (req, res) => {

    try {
        const doctor = await Doctor.findById(req.params.doctorId)
            .populate("")

        res.json({ doctor });
    } catch (err) {
        console.log(err, 'supporterController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId)

        res.json({ deletedDoctor });
    } catch (err) {
        console.log(err, 'doctorController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};