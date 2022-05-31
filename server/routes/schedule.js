

const express = require("express");

const { create, list, listScheduleByDoctor, read, update,
    remove } = require("../controllers/schedule")

const router = express.Router();



router.post("/create", create)
router.get("/list", list)

router.get("/all/:doctorId", listScheduleByDoctor)
router.get("/:scheduleId", read)
router.put("/:scheduleId", update)
router.delete("/:scheduleId", remove)

module.exports = router;