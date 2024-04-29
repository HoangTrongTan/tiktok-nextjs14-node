
const express = require("express");
const router = express.Router();
const controller = require("../controllers/favoutites.controller");
const middlewware = require('../middlesware');

// ---------------POST------------------------------------------------
router.post("/create-favoutites",middlewware.middlewareFavourites.checkExistUserFavourites , controller.increaseHeart);

//---------------GET-----------------------------------------------
router.get("/getvideo/:id", controller.getVideoByUser);

module.exports = router;
