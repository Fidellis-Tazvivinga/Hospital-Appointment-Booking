const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ScheduleSchema = new mongoose.Schema(
    {
        doctor: {
            type: ObjectId,
            ref: "Doctor",
            required: true
        },

        date: {
            type: String,
            required: true
        },
        time: {
            type: Array,
            required: true
        },
        maxBooking: {
            type: String,

        },
        sumBooking: {
            type: String,

        },


    },
    { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;