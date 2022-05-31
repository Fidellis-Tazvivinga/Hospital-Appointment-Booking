

const express = require("express");

const { create, list, read, update,
    remove } = require("../controllers/city")

const router = express.Router();



router.post("/create", create)
router.get("/list", list)

router.get("/:cityId", read)
router.put("/:cityId", update)
router.delete("/:cityId", remove)

module.exports = router;