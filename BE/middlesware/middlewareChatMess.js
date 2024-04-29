const modelFollow = require("../models/follow.models");
const modelLikeMess = require("../models/likeMessage.modles");

const checkFollow = async (req, res, next) => {
  try {
    const obj = req.body;
    const result = await modelFollow.findOne({
      _id: obj.idFollow,
      isSuccess: true,
    });
    if (result) {
      req.checkFriends = true;
      next();
    } else {
      req.checkFriends = false;
      next();
    }
  } catch (e) {
    console.log("Lỗi nhắn tin middleware check follow !!", e);
    req.checkFriends = false;
    next();
    // return res.status(400).json({
    //   messsage: "Chỉ có bạn bè mới gửi được tin nhắn cho nhau !🙃🙃",
    // });
  }
};
const checkLike = async (req, res, next) => {
  try {
    const { idMessage,idUser } = req.body;

    const result = await modelLikeMess.findOne({
      idMessage,
      idUser
    });
    console.log("FIND RESULT: ", result );
    console.log("FIND RESULT: ", result );
    if (result) {
      req.checkLikeMessage = true;
      next();
    } else {
      req.checkLikeMessage = false;
      next();
    }
    
    console.log("FIND RESULT: ", req.checkLikeMessage);
  } catch (e) {
    console.log("Lỗi thích nhắn tin middleware !!", e);
    req.checkLikeMessage = false;
    next();
  }
};

module.exports = { checkFollow ,checkLike };
