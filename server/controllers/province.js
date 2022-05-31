const Province = require("../models/Province")

exports.create = async (req, res) => {
    //incoming user data
    console.log(req.body);

    const { name, cities } = req.body;

    try {
        const province = await Province.findOne({ name });
        if (province) {
            return res.status(400).json({
                errorMessage: "province already exists",
            });
        }

        const newProvince = new Province();
        newProvince.name = name;
        newProvince.cities = cities;



        await newProvince.save();

        res.json({
            successMessage: "newProvince added successfully.",
            newProvince
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
        const provinces = await Province.find({})

        res.json({ provinces });
    } catch (err) {
        console.log(err, 'Province.readAll error');
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