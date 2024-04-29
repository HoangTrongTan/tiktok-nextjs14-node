const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");
const middlewware = require('../middlesware');

router.put("/like", middlewware.middlewareComment.checkExistUserLikeComment , controller.like);
router.post("/create", controller.create);
router.delete('/delete/:id' , controller.delete);
router.get("/like-comment/:id_comment", controller.showLike);
router.get("/:id_video", controller.index);
module.exports = router;
