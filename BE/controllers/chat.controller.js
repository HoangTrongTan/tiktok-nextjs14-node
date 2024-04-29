const modelFollow = require("../models/follow.models");
const modelChatMess = require("../models/chat.modles");
const modelLikeMess = require("../models/likeMessage.modles");

class ChatMessage {
  // [POST] /api/chat-message/create
  async create(req, res, next) {
    try {
      if (req.checkFriends) {
        await modelChatMess.create(req.body);
        return res.json({
          messsage: "thành công !!",
        });
      } else {
        return res.status(400).json({
          messsage: "Chỉ có bạn bè mới gửi được tin nhắn cho nhau !🙃🙃",
        });
      }
    } catch (e) {
      console.log(">>>Lỗi ChatMessage: ", e);
    }
  }
  // [POST] /api/chat-message/like-message/
  async postLike(req, res, next) {
    try {
      const { idMessage , idUser  } = req.body;
      if(req.checkLikeMessage){
          await modelLikeMess.deleteOne({ idMessage });
          return res.json({
            message: "ok"
          });
      }
      await modelLikeMess.create({
        idUser,
        idMessage
      });
      return res.json({
        message: "ok"
      });
    } catch (e) {
      console.log(">>>Lỗi ChatMessage: ", e);
    }
  }
  // [GET] /api/chat-message/get-like-message/:idMessage
  async getLike(req, res, next) {
    try {
      const { idMessage  } = req.params;
      const rs = await modelLikeMess.findOne({ idMessage });
      return res.json(rs);
    } catch (e) {
      console.log(">>>Lỗi ChatMessage: ", e);
    }
  }
  //[DELETE] /api/chat-message/delete-like-message/:idMessage
  async deleteMessage(req, res, next) {
    try {
      const { idMessage } = req.params;
      await modelChatMess.deleteOne({ _id:idMessage });
      return res.json({
        message:"xóa thành công !!"
      });
    } catch (e) {
      console.log(">>>Lỗi ChatMessage: ", e);
    }
  }
  // [GET] /api/chat-message/get/:id
  async getChatById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await modelChatMess.find({ idFollow: id });
      let dataTemp = [];
      let flag = -1;
      const getDate = (str) => {
        if(str){
          const date = new Date(str);
          return `${date.getDay()}${date.getMonth() + 1}${date.getFullYear()}`
        }
        return "";
      }
      const newResult = result.reduce((inital, item) => {
        if (inital.some((_) => getDate(_?.date) === getDate(item.createdAt))) {
          dataTemp.push(item);
          inital[flag].datas.push(item);
          return inital;
        }
        flag++;
        dataTemp = [];
        inital.push({ date: item.createdAt, datas: [item] });
        return inital;
      }, []);
      // console.log("NEW RESULT: ", newResult);
      res.json(newResult);
    } catch (e) {
      console.log(">>>Lỗi ChatMessage: ", e);
    }
  }
}

module.exports = new ChatMessage();
