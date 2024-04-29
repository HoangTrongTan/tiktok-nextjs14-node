const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification.controller");
const middlewareNotifi = require('../middlesware/middlewareNotifi');

// ------------------GET------------------------
router.get("/likes/:idUser", controller.getLikes , middlewareNotifi.likes);
router.get("/likes-feedback/:idUser", controller.likeFeedbacks , middlewareNotifi.likes);
router.get("/likes-video/:idChuSoHuu", controller.likesVideo);
router.get("/comment/:idChuSoHuu", controller.comment);
router.get("/comment-feedback/:idUser", controller.getCmtFeedBack);


module.exports = router;
