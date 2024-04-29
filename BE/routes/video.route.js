const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/video.controller");
const middleWare = require('../middlesware');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/videos/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null,uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", controller.index);
router.post("/create" , upload.single('video'), controller.create);
router.put("/increate-like" , middleWare.middlewareVideo.checkExistUserLike , controller.increaseHeart);

router.get('/show/like/list/:id', controller.getLikeVideoList)
router.get("/show-video/:id_user/own" , controller.showByUser);
router.get("/show-actions/one/:id" , controller.show_actions);
router.get("/one/:id_video/:id_user" , controller.getOne);
module.exports = router;
