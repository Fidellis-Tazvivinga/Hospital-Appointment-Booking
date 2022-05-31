const Schedule = require("../models/Schedule")

exports.create = async (req, res) => {
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


exports.list = async (req, res) => {
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
exports.listScheduleByDoctor = async (req, res) => {

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


exports.read = async (req, res) => {

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



exports.update = async (req, res) => {
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

exports.remove = async (req, res) => {
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