/* const express = require("express");
import {
    create,
    read,
    list,
    update,
    remove
  } from "../controllers/doctor";
const router = express.Router();

router.post("/create-doctor", create)
router.get("/read-doctor/:id", read)
router.get("/list-doctors", list)
router.put("/update-doctor/:id", update)
router.delete("/delete-doctor/:id", remove)


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
const { create } = require("../controllers/hospital")

const router = express.Router();



router.post("/create", create)
/* router.get("/read/:id", read)
router.get("/list-hospitals", list)
router.put("/update-hospital/:id", update)
router.delete("/delete-hospital/:id", remove) */


module.exports = router;