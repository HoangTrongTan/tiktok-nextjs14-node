const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.feedback.controller");

router.get("/count/:id_comment", controller.count);
router.post("/create", controller.create);
router.get("/:id_comment/:limit", controller.index);
module.exports = router;
