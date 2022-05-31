const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1,
    },
    address: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    images: {
      type: String,
    },
    specialization: {
      type: ObjectId,
      ref: "Specialization",

      strictPopulate: false
    },
    hospital: {
      type: ObjectId,
      ref: "Hospital",
    },
    clinic: {
      type: ObjectId,
      ref: "Clinic",
    },
    /*  availableTime:{
       type: [],
 
     },
     schedule:{
       type: ObjectId,
       ref : "Schedule"
       
     } */
    /*   gender: {
        type: String,
       enum:["Male,Female"]
      }, */

  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;