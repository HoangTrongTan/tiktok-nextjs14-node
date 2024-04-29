const express = require("express");
const router = express.Router();
const controller = require("../controllers/chat.controller");
const middleware = require('../middlesware/middlewareChatMess');

// ------------------GET------------------------
router.get("/get/:id", controller.getChatById);
router.get("/get-like-message/:idMessage", controller.getLike);

//-------------------DELETE---------------------
router.delete("/delete-like-message/:idMessage", controller.deleteMessage);


// ------------------POST-----------------------
router.post("/create", middleware.checkFollow ,controller.create);
router.post("/like-message", middleware.checkLike ,controller.postLike);


module.exports = router;
