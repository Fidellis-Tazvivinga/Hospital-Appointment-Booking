/* const express = require("express");
import {
  create,
  read,
  list,
  update,
  remove
} from "../controllers/specialization";
const router = express.Router();

router.post("/create-specialization", create)
router.get("/read/:id", read)
router.get("/list-specializations", list)
router.put("/update-specialization/:id", update)
router.delete("/delete-specialization/:id", remove)


module.exports = router; */



const express = require("express");
/* import {
  create,
   read,
  list,
  update,
  remove 
} from "../controllers/hospital"; */

const { create, list, read, update,
  remove } = require("../controllers/specialization")

const router = express.Router();



router.post("/create", create)
router.get("/list", list)
router.get("/:specializationId", read)
router.put("/:specializationId", update)
router.delete("/:specializationId", remove)
/* router.get("/read/:id", read)
router.get("/list-hospitals", list)
router.put("/update-hospital/:id", update)
router.delete("/delete-hospital/:id", remove) */


module.exports = router;