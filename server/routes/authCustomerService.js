const express = require("express");
const router = express.Router();

const { signupController, signinController } = require("../controllers/authCustomerService");
const { list, read, update,
    remove } = require("../controllers/customerService")

router.post("/signup", signupController);
router.post("/login", signinController);
//router.post("/create", create)
router.get("/list", list)
router.get("/:customerserviceId", read)
router.put("/:customerserviceId", update)
router.delete("/:customerserviceId", remove)


module.exports = router;