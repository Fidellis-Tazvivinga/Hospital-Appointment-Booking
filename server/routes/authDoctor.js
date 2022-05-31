const express = require("express");
const router = express.Router();

const upload = require('../middleware/multer');
const { signupController, signinController } = require("../controllers/authDoctor");
const { list, listBySearch, listBySearchClinic, read, update,
    remove } = require("../controllers/doctor")


const cpUpload = upload.fields([{ name: 'dataImages ', maxCount: 4 }, { name: 'dataImages', maxCount: 8 }])



router.post("/signup", cpUpload, signupController);
router.post("/login", signinController);

router.post("/create", cpUpload, signupController)

//router.post("/create", create)
router.get("/list", list)
router.post("/bysearch", listBySearch)
router.post("/bysearch/clinic", listBySearchClinic)
router.get("/:doctorId", read)

router.put("/:doctorId", update)
router.delete("/:doctorId", remove)



module.exports = router;