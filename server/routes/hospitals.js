const express = require("express");
/* import {
  create,
   read,
  list,
  update,
  remove 
} from "../controllers/hospital"; */
const upload = require('../middleware/multer');
const { create, list, read, deleteHospital, update, listByProvince, listBySearch } = require("../controllers/hospital")

const router = express.Router();



router.post("/create", upload.single('hospitalImage'), create)


router.post("/bysearch", listBySearch)
router.get("/list", list)
router.get("/province/:province", listByProvince)
router.get("/:hospitalId", read)
router.put("/:hospitalId", upload.single('hospitalImage'), update)
router.delete("/:hospitalId", deleteHospital)




module.exports = router;