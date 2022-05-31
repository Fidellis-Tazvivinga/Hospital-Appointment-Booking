/* const express = require("express");
import {
    create,
    read,
    list,
    update,
    remove
  } from "../controllers/clinic";
const router = express.Router();

router.post("/create-clinic", create)
router.get("/read/:id", read)
router.get("/list-clinics", list)
router.put("/update-clinic/:id", update)
router.delete("/delete-clinic/:id", remove)


module.exports = router; */
const express = require("express");
/* import {
  create,
   read,
  list,
  update,
  remove 
} from "../controllers/hospital"; */
const upload = require('../middleware/multer');
const { create, list, read, deleteClinic, update, listBySearch, listByProvince } = require("../controllers/clinic")

const router = express.Router();



router.post("/create", upload.single('clinicImage'), create)
router.get("/list", list)


router.post("/bysearch", listBySearch)

router.get("/province/:province", listByProvince)

router.get("/:clinicId", read)
router.put("/:clinicId", upload.single('clinicImage'), update)
router.delete("/:clinicId", deleteClinic)



module.exports = router;