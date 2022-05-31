import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema(
    {
        appointmentTime: {
            type: String,
            index: true
        },
        appointmentDate: {
            type: String,
            index: true
        },
        appointmentType: {
            type: String,

        },
        hospital: {
            type: ObjectId,
            ref: "Hospital"

        },
        clinic: {
            type: ObjectId,
            ref: "Clinic"

        },
        nameOfPoliclinic: {
            type: String,

        },
        doctor: {
            type: ObjectId,
            ref: "Doctor"

        },
        examLocation: {
            type: String,

        },
        appointmentNote: {
            type: String,

        },
        appointmentOwner: {
            type: ObjectId,
            ref: "User",




        },
        appointmentStatus: {
            type: String,
            enum: ['Active', 'Past', 'Confirmed', 'Attended', "Cancelled"],
            default: "Active"


        },

    },
    { timestamps: true }
);


const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;