const CustomerService = require("../models/CustomerService")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");


exports.signupController = async (req, res) => {
  //incoming user data
  const { username, email, password, phoneNumber,
    specialization,
    hospital, } = req.body;
  console.log(req.body);
  try {
    const customerservice = await CustomerService.findOne({ email });
    if (customerservice) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newCustomerService = new CustomerService();
    newCustomerService.username = username;
    newCustomerService.email = email;
    newCustomerService.specialization = specialization;
    newCustomerService.hospital = hospital;
    newCustomerService.phoneNumber = phoneNumber;

    //add other fields we will send from client

    const salt = await bcrypt.genSalt(10);
    newCustomerService.password = await bcrypt.hash(password, salt);

    await newCustomerService.save();

    res.json({
      successMessage: "Supporter Registered. Please signin.",
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
    const customerservice = await CustomerService.findOne({ email });
    if (!customerservice) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, customerservice.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const payload = {
      customerservice: {
        _id: customerservice._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log("jwt error: ", err);
      const { _id, username, email, role } = customerservice;

      res.json({
        token,
        customerservice: { _id, username, email, role },
      });
    });
  } catch (err) {
    console.log("signinController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};