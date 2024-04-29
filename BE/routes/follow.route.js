const express = require("express");
const router = express.Router();
const controller = require("../controllers/follow.controller");
const middlewware = require('../middlesware');

// -------------------- PUT --------------------------------------
router.put("/accept" , controller.accept );

// -------------------- POST -------------------------------------
router.post("/add", middlewware.middlewareFollow.checkExistUserFollow , controller.create);


// -------------------- GET -----------------------------
router.get("/show-list-friends/:id" , controller.showListFriends);
router.get("/show/:idUser/:idFriends" , controller.show);


//-----------------------DELETE-----------------------------------
router.delete('/unfollow/:idUser/:idFriends' , controller.unFollow);

module.exports = router;
