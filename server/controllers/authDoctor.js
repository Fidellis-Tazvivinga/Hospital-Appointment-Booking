const Doctor = require("../models/Doctor")
const fs = require('fs');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");


exports.signupController = async (req, res) => {
  //incoming user data
  console.log(req.body);
  console.log(req.file);

  console.log(req.files);
  const { name, email, password, phoneNumber, address, description, specialization, hospital, clinic } = req.body;
  console.log(req.body);
  try {
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newDoctor = new Doctor();
    newDoctor.name = name;
    newDoctor.email = email;
    newDoctor.phoneNumber = phoneNumber;
    newDoctor.address = address;
    newDoctor.description = description;
    newDoctor.specialization = specialization;
    if (!(hospital == "none")) {

      newDoctor.hospital = hospital;
    }
    if (!(clinic == "none")) {

      newDoctor.clinic = clinic;
    }

    const salt = await bcrypt.genSalt(10);
    newDoctor.password = await bcrypt.hash(password, salt);

    await newDoctor.save();

    res.json({
      successMessage: "Registration success. Please signin.",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const payload = {
      doctor: {
        _id: doctor._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log("jwt error: ", err);
      const { _id, name, email, role } = doctor;

      res.json({
        token,
        doctor: { _id, name, email, role },
      });
    });
  } catch (err) {
    console.log("signinController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
/* 
  
exports.create = async (req, res) => {
  console.log("api reachded");

  const { name } = req.body;

  console.log(req.body);

  try {
      let specialization = new Specialization();


      specialization.name = name;
      console.log("letys save this spec", specialization);
      await specialization.save();

      res.json({
          successMessage: `${name} was created`,
          specialization,
      });
  } catch (err) {
      console.log(err, 'specializationController.create error');
      res.status(500).json({
          errorMessage: 'Please try again later',
      });
  }
}; */