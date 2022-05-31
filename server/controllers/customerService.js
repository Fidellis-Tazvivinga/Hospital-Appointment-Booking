const CustomerService = require("../models/CustomerService")

exports.list = async (req, res) => {
    try {
        const supporters = await CustomerService.find({})

        res.json({ supporters });
    } catch (err) {
        console.log(err, 'Controller.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.update = async (req, res) => {
    try {
        const supporterId = req.params.customerserviceId;
        const supporter = await CustomerService.findByIdAndUpdate(supporterId, req.body)

        res.json({ successMessage: `${supporter.username} was successfully edited` });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.read = async (req, res) => {

    try {
        const supporter = await CustomerService.findById(req.params.customerserviceId)

        res.json({ supporter });
    } catch (err) {
        console.log(err, 'supporterController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const customerserviceId = req.params.customerserviceId;
        const deletedSupporter = await CustomerService.findByIdAndDelete(customerserviceId)

        res.json({ deletedSupporter });
    } catch (err) {
        console.log(err, 'supporterController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


//vaccine


exports.createVaccine = async (req, res) => {
    //incoming user data
    console.log(req.body);

    const { doc, checkedDatePhrames, checkedKeys } = req.body;

    try {
        const schedule = await Schedule.findOne({ doctor: doc, date: checkedDatePhrames });
        if (schedule) {
            return res.status(400).json({
                errorMessage: "Schedule already exists",
            });
        }

        const newSchedule = new Schedule();
        newSchedule.doctor = doc;
        newSchedule.date = checkedDatePhrames;
        newSchedule.time = checkedKeys;

        await newSchedule.save();

        res.json({
            successMessage: "newSchedule added successfully.",
            newSchedule
        });
    } catch (err) {
        console.log("schedule error: ", err);
        res.status(500).json({
            errorMessage: "Server error",
        });
    }
};


exports.listVaccine = async (req, res) => {
    try {
        const schedules = await Schedule.find({})

        res.json({ schedules });
    } catch (err) {
        console.log(err, 'schedulesController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.listScheduleByDoctorVaccine = async (req, res) => {

    try {
        const schedules = await Schedule.find({ doctor: req.params.doctorId }).sort({ date: 1 }).exec()

        res.json({ schedules });
    } catch (err) {
        console.log(err, 'schedulesController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.readVaccine = async (req, res) => {

    try {
        const specialization = await Schedule.findById(req.params.specializationId)

        res.json({ specialization });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};



exports.updateVaccine = async (req, res) => {
    try {
        const specializationId = req.params.specializationId;
        const specialization = await Schedule.findByIdAndUpdate(specializationId, req.body)

        res.json({ successMessage: `${specialization.name} was successfully edited` });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.removeVaccine = async (req, res) => {
    try {
        const scheduleId = req.params.scheduleId;
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId)

        res.json({ deletedSchedule });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};