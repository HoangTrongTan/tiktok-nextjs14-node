const modelComment = require("../models/comment.models");
const modelLikeComment = require("../models/like.comment.models");
const modelFeedBackComment = require("../models/comment.feedback.models");
class Comment {
  async index(req, res, next) {
    try {
      const { id_video } = req.params;
      const rs = await modelComment.find({ idVideo: id_video }).exec();
      res.json(rs);
    } catch (e) {
      console.log(">>>Lỗi lấy các bình luận: ", e);
    }
  }
  async create(req, res, next) {
    try {
      const { idVideo, idUser, noidung } = req.body;
      const comment = new modelComment({
        idVideo: idVideo,
        idUser: idUser,
        noidung: noidung,
      });
      await comment.save();
      return res.json({ message: "bình luận thành công !!" });
    } catch (e) {
      console.log(">>>thêm bình luận: ", e);
    }
  }
  async like(req, res, next) {
    try {
      const { idComment, idUser  } = req.body;
      if (req.checkUserLikeComment) {
        await modelLikeComment.deleteOne({ idComment, idUser });
        return res.json({
          message: "Đã bỏ thích !",
        });
      }
      await modelLikeComment.create({ idComment, idUser });
      return res.json({ message: "đã thích !" });
    } catch (e) {
      console.log(">>>Lỗi like: ", e);
    }
  }
  async showLike(req, res, next) {
    try {
      const { id_comment } = req.params;
      const count = await modelLikeComment
        .find({ idComment: id_comment })
        .exec();
      res.json({ idUser: count.map((ite) => ite.idUser) });
    } catch (e) {
      console.log(">>>Lỗi show like: ", e);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await modelComment.deleteOne({ _id: id });
      await modelFeedBackComment.deleteOne({ _id: id });

      const findFeedBack = await modelFeedBackComment.find({ idComment: id });
      if (findFeedBack) {
        await Promise.all(
          findFeedBack.map(async (feedback) => {
            await modelLikeComment.deleteOne({ idComment: feedback._id });
          })
        );
      }
      await modelFeedBackComment.deleteMany({ idComment: id }); 
      res.json({ message: "xóa thành công !!" });
    } catch (e) {
      console.log(">>>Lỗi xóa : ", e);
    }
  }
}

module.exports = new Comment();
