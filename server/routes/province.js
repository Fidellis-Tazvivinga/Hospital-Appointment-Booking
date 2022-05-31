

const express = require("express");

const { create, list, read, update,
    remove } = require("../controllers/province")

const router = express.Router();



router.post("/create", create)
router.get("/list", list)

router.get("/:provinceId", read)
router.put("/:provinceId", update)
router.delete("/:provinceId", remove)


module.exports = router;