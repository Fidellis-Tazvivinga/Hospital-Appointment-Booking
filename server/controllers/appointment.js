const { sendEmail } = require("../helpers");
const Appointment = require("../models/Appointment")
const User = require("../models/User")

exports.create = async (req, res) => {
    //incoming user data
    console.log(req.body);

    const { appointmentTime, appointmentType, appointmentPlace, nameOfPoliclinic, doctor, doctorId, examLocation, appointmentNote, appointmentOwner, appointmentDate } = req.body;

    try {


        const appointment = await Appointment.findOne({ appointmentTime, appointmentDate, doctorId })
        if (appointment) {
            return res.status(400).json({
                errorMessage: "appointment already exists",
            });
        }


        const newAppointment = new Appointment();

        newAppointment.appointmentTime = appointmentTime;
        newAppointment.appointmentDate = appointmentDate;
        newAppointment.appointmentType = appointmentType;
        if (req.body.hospitalId) {

            newAppointment.hospital = req.body.hospitalId;
        }
        if (req.body.clinicId) {

            newAppointment.clinic = req.body.clinicId;
        }
        newAppointment.nameOfPoliclinic = nameOfPoliclinic;
        newAppointment.doctor = doctorId;
        newAppointment.examLocation = examLocation;
        newAppointment.appointmentNote = appointmentNote;
        newAppointment.appointmentOwner = appointmentOwner;



        await newAppointment.save();
        const user = await User.findById(appointmentOwner);
        if (user) {
            console.log("user found");

        } else {
            console.log("user not found");
        }


        //send an email to the user

        // email data
        const emailData = {
            from: process.env.userEmail,
            to: user.email,
            subject: "Appointment Confirmation",
            text: `your appointment has been booked on the date ${appointmentDate} at ${appointmentTime}`,
            html: `<p>your appointment has been booked at ${appointmentDate} at ${appointmentTime}</p>`
        };

        await sendEmail(emailData, err => {
            if (err) {
                console.log("Email was not sent");
                res.json({
                    errorMessage: "Problem with Email occured.",

                });
            }
        })
        res.json({
            successMessage: "Appointment added successfully.",
            newAppointment
        });


    } catch (err) {
        console.log("schedule error: ", err);
        res.status(500).json({
            errorMessage: "Server error",
        });
    }
};


exports.getAll = async (req, res) => {
    const userId = req.params.userId
    console.log(userId);
    try {
        const appointments = await Appointment.find({})
            .populate("hospital", "hospitalName")
            .populate("clinic", "clinicName")
            .populate("doctor", "name")

            .exec()
        console.log("current availabke appointments", appointments)

        res.json({ appointments });
    } catch (err) {
        console.log(err, 'appointments.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.list = async (req, res) => {
    const userId = req.params.userId
    console.log(userId);
    try {
        const appointments = await Appointment.find({ appointmentOwner: userId }).sort({ appointmentDate: 1 })
            .populate("hospital", "hospitalName")
            .populate("clinic", "clinicName")
            .populate("doctor", "name")

            .exec()
        console.log("current availabke appointments", appointments)

        res.json({ appointments });
    } catch (err) {
        console.log(err, 'appointments.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.listByDoctor = async (req, res) => {


    try {
        const appointments = await Appointment.find({ doctor: req.params.doctorId }).sort({ appointmentDate: 1 })
            .populate("hospital", "hospitalName")
            .populate("doctor", "name")
            .populate("appointmentOwner", "username")
            .exec()
        console.log("current availabke appointments", appointments)

        res.json({ appointments });
    } catch (err) {
        console.log(err, 'appointments.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.read = async (req, res) => {

    /*   try {
         const specialization = await Appointment.findById(req.params.specializationId)
 
         res.json({ specialization });
     } catch (err) {
         console.log(err, 'specializationController.readAll error');
         res.status(500).json({
             errorMessage: 'Please try again later',
         });
     }   */
};



exports.update = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, req.body)

        res.json({ successMessage: `appointment was successfully edited` });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.confirm = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const filter = { _id: appointmentId };
        const update = { appointmentStatus: "Confirmed" };
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ successMessage: ` appointment was successfully edited`, appointment });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.attended = async (req, res) => {

    try {
        const appointmentId = req.params.appointmentId;
        const filter = { _id: appointmentId };
        const update = { appointmentStatus: "Attended" };
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ successMessage: ` appointment was successfully edited`, appointment });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.cancelled = async (req, res) => {

    try {
        const appointmentId = req.params.appointmentId;
        const filter = { _id: appointmentId };
        const update = { appointmentStatus: "Cancelled" };
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ successMessage: ` appointment was successfully edited`, appointment });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.remove = async (req, res) => {

    //when the user cancels we can actually just update the appointmentStatus to Cancelled
    //use this link for ref https://www.mongodb.com/docs/manual/tutorial/expire-data/
    try {
        const appointmentId = req.params.appointmentId;
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId)

        res.json({ deletedAppointment });
    } catch (err) {
        console.log(err, 'deletedAppointment.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};