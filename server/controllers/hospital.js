const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const fs = require('fs');

exports.create = async (req, res) => {
    console.log("api reachded");

    const filename = req.file?.filename;

    const { hospitalName,
        hospitalPhoneNumber,
        hospitalAddress,
        hospitalIntroduction,
        hospitalDesc, hospitalProvince } = req.body;

    console.log(req.body);

    try {
        let hospital = new Hospital();

        hospital.hospitalImage = filename;
        hospital.hospitalName = hospitalName;
        hospital.hospitalPhoneNumber = hospitalPhoneNumber;
        hospital.hospitalAddress = hospitalAddress;
        hospital.hospitalIntroduction = hospitalIntroduction;
        hospital.hospitalDesc = hospitalDesc;
        hospital.hospitalProvince = hospitalProvince;

        await hospital.save();

        res.json({
            successMessage: `${hospitalName} was created`,
            hospital,
        });
    } catch (err) {
        console.log(err, 'hospitalController.create error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.list = async (req, res) => {
    try {
        const hospitals = await Hospital.find({}).populate("hospitalProvince")

        res.json({ hospitals });
    } catch (err) {
        console.log(err, 'hospitalsController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.listByProvince = async (req, res) => {

    try {
        const hospitals = await Hospital.find({ hospitalProvince: req.params.province }).populate("hospitalProvince")
        console.log(hospitals);
        /* not work'ng */
        if (!hospitals) {
            console.log("hospital not found");
            res.json({ message: "Hospital Not found in this Province" });

        }
        res.json({ hospitals });
    } catch (err) {
        console.log(err, 'hospitalsController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};
exports.listBySearch = async (req, res) => {
    console.log(req.body);
    /* 
        const { optionValueProvince, optionValueHospital, optionValueSpecialization } = req.body
        try {
    
            const doctors = await Doctor.find({ specialization: optionValueSpecialization, hospital: { _id: optionValueHospital } }).populate("hospital")
    
            console.log(doctors);
    
            if (!doctors) {
                console.log("hospital not found");
                res.json({ message: "Hospital Not found in this Province" });
    
            }
            res.json({ doctors });
        } catch (err) {
            console.log(err, 'hospitalsController.readAll error');
            res.status(500).json({
                errorMessage: 'Please try again later',
            });
        } */
};

exports.read = async (req, res) => {
    console.log("reached the read api", req.params.hospitalId);
    try {
        const hospital = await Hospital.findById(req.params.hospitalId)

        res.json({ hospital });
    } catch (err) {
        console.log(err, 'hospitalController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.update = async (req, res) => {
    const hospitalId = req.params.hospitalId;
    console.log(req.body);
    if (req.file !== undefined) {
        req.body.hospitalImage = req.file.filename;
    }

    const oldHospital = await Hospital.findByIdAndUpdate(hospitalId, req.body);

    if (req.file !== undefined && req.file.filename !== oldHospital.hospitalImage) {
        fs.unlink(`uploads/${oldHospital.hospitalImage}`, err => {
            if (err) throw err;
            console.log('Image deleted from the filesystem');
        });
    }

    res.json({
        successMessage: 'hospital successfully updated',
    });
};

exports.deleteHospital = async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);

        fs.unlink(`uploads/${deletedHospital.hospitalImage}`, err => {
            if (err) throw err;
            console.log(
                'Image successfully deleted from filesystem: ',
                deletedHospital.hospitalImage
            );
        });

        res.json(deletedHospital);
    } catch (err) {
        console.log(err, 'productController.delete error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};






/* 

exports.readByCount = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('productCategory', 'category')
            .limit(6);

        res.json({ products });
    } catch (err) {
        console.log(err, 'productController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.read = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        res.json(product);
    } catch (err) {
        console.log(err, 'productController.read error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};

exports.update = async (req, res) => {
    const productId = req.params.productId;

    if (req.file !== undefined) {
        req.body.fileName = req.file.filename;
    }

    const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

    if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
        fs.unlink(`uploads/${oldProduct.fileName}`, err => {
            if (err) throw err;
            console.log('Image deleted from the filesystem');
        });
    }

    res.json({
        successMessage: 'Product successfully updated',
    });
};

exports.delete = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        fs.unlink(`uploads/${deletedProduct.fileName}`, err => {
            if (err) throw err;
            console.log(
                'Image successfully deleted from filesystem: ',
                deletedProduct.fileName
            );
        });

        res.json(deletedProduct);
    } catch (err) {
        console.log(err, 'productController.delete error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
}; */