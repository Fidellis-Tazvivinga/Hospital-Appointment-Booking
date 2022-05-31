const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const VaccineSchema = new mongoose.Schema(
    {
        hospital: {
            type: ObjectId,
            ref: "Hospital",

        },
        clinic: {
            type: ObjectId,
            ref: "Clinic"

        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: Array,
            required: true
        },



    },
    { timestamps: true }
);

const Vaccine = mongoose.model("Vaccine", VaccineSchema);

module.exports = Vaccine;