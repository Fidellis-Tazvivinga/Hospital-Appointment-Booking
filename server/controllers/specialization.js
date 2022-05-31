const Specialization = require('../models/Specialization');
const fs = require('fs');

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
};


exports.list = async (req, res) => {
    try {
        const specializations = await Specialization.find({})

        res.json({ specializations });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.read = async (req, res) => {

    try {
        const specialization = await Specialization.findById(req.params.specializationId)

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
        const specialization = await Specialization.findByIdAndUpdate(specializationId, req.body)

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
        const specializationId = req.params.specializationId;
        const deletedSpecialization = await Specialization.findByIdAndDelete(specializationId)

        res.json({ deletedSpecialization });
    } catch (err) {
        console.log(err, 'specializationController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};