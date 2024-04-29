const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/get/:id", controller.getuser);
router.post("/get/name", controller.getuserByName)
router.post("/create", controller.create);
module.exports = router;
