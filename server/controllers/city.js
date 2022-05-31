const City = require("../models/City")

exports.create = async (req, res) => {
    //incoming user data
    console.log(req.body);

    const { name, province } = req.body;

    try {
        const city = await City.findOne({ name });
        if (city) {
            return res.status(400).json({
                errorMessage: "city already exists",
            });
        }

        const newCity = new City();
        newCity.name = name;
        newCity.province = province;



        await newCity.save();

        res.json({
            successMessage: "newProvince added successfully.",
            newCity
        });
    } catch (err) {
        console.log("schedule error: ", err);
        res.status(500).json({
            errorMessage: "Server error",
        });
    }
};


exports.list = async (req, res) => {
    try {
        const cities = await City.find({})

        res.json({ cities });
    } catch (err) {
        console.log(err, 'cities.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


exports.read = async (req, res) => {

    /*  try {
         const specialization = await Schedule.findById(req.params.specializationId)
 
         res.json({ specialization });
     } catch (err) {
         console.log(err, 'specializationController.readAll error');
         res.status(500).json({
             errorMessage: 'Please try again later',
         });
     } */
};



exports.update = async (req, res) => {
    /*   try {
          const specializationId = req.params.specializationId;
          const specialization = await Schedule.findByIdAndUpdate(specializationId, req.body)
  
          res.json({ successMessage: `${specialization.name} was successfully edited` });
      } catch (err) {
          console.log(err, 'specializationController.readAll error');
          res.status(500).json({
              errorMessage: 'Please try again later',
          });
      } */
};

exports.remove = async (req, res) => {
    /*  try {
         const specializationId = req.params.specializationId;
         const deletedSpecialization = await Schedule.findByIdAndDelete(specializationId)
 
         res.json({ deletedSpecialization });
     } catch (err) {
         console.log(err, 'specializationController.readAll error');
         res.status(500).json({
             errorMessage: 'Please try again later',
         });
     } */
};