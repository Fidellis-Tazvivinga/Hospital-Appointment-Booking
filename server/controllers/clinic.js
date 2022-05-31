const Clinic = require('../models/Clinic');
const fs = require('fs');

exports.create = async (req, res) => {
  console.log("api reachded");
  const { filename } = req.file;
  console.log(filename);
  console.log("bodyyy", req.body);
  const { clinicName,
    clinicPhoneNumber,
    clinicAddress,
    clinicIntroduction,
    clinicDesc, clinicProvince } = req.body;



  try {
    let clinic = new Clinic();

    clinic.clinicImage = filename;
    clinic.clinicName = clinicName;
    clinic.clinicPhoneNumber = clinicPhoneNumber;
    clinic.clinicAddress = clinicAddress;
    clinic.clinicIntroduction = clinicIntroduction;
    clinic.clinicDesc = clinicDesc;
    clinic.clinicProvince = clinicProvince;

    await clinic.save();

    res.json({
      successMessage: `${clinicName} was created`,
      clinic,
    });
  } catch (err) {
    console.log(err, 'clinicController.create error');
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};


exports.list = async (req, res) => {
  try {
    const clinics = await Clinic.find({})

    res.json({ clinics });
  } catch (err) {
    console.log(err, 'clinicsController.readAll error');
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};

exports.listByProvince = async (req, res) => {

  try {
    const clinics = await Clinic.find({ clinicProvince: req.params.province }).populate("clinicProvince")
    console.log(clinics);
    /* not work'ng */
    if (!clinics) {
      console.log("clinics not found");
      res.json({ message: "clinics Not found in this Province" });

    }
    res.json({ clinics });
  } catch (err) {
    console.log(err, 'clinicsController.readAll error');
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
  console.log("reached the read api", req.params.clinicId);
  try {
    const clinic = await Clinic.findById(req.params.clinicId)

    res.json({ clinic });
  } catch (err) {
    console.log(err, 'clinicsController.readAll error');
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};


exports.update = async (req, res) => {
  const clinicId = req.params.clinicId;
  console.log(req.body);
  if (req.file !== undefined) {
    req.body.clinicImage = req.file.filename;
  }

  const oldClinic = await Clinic.findByIdAndUpdate(clinicId, req.body);

  if (req.file !== undefined && req.file.filename !== oldClinic.clinicImage) {
    fs.unlink(`uploads/${oldClinic.clinicImage}`, err => {
      if (err) throw err;
      console.log('Image deleted from the filesystem');
    });
  }

  res.json({
    successMessage: 'Clinic successfully updated',
  });
};

exports.deleteClinic = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const deletedClinic = await Clinic.findByIdAndDelete(clinicId);

    fs.unlink(`uploads/${deletedClinic.clinicImage}`, err => {
      if (err) throw err;
      console.log(
        'Image successfully deleted from filesystem: ',
        deletedClinic.clinicImage
      );
    });

    res.json(deletedClinic);
  } catch (err) {
    console.log(err, 'productController.delete error');
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};



//we will get all products except the images because with images it might
//load slow , we will create a separate endpoint for images 
/* export const list = async (req, res) => {
  let all = await Hotel.find({})
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.json(all);
};

//get image
export const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  console.log("SINGLE HOTEL", hotel);
  res.json(hotel);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Hotel update failed. Try again.");
  }
};



export const searchListings = async (req, res) => {
  const { location, date, bed } = req.body;
  // console.log(location, date, bed);
  // console.log(date);
  const fromDate = date.split(",");
  // console.log(fromDate[0]);
  let result = await Hotel.find({
    from: { $gte: new Date(fromDate[0]) },
    location,
  })
    .select("-image.data")
    .exec();
  // console.log("SEARCH LISTINGS", result);
  res.json(result);
};
 */