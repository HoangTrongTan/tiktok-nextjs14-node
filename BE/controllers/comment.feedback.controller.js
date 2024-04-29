const modelCommentFeedBack = require("../models/comment.feedback.models");
class CommentFeedBack {
  async index(req, res, next) {
    try {
      const { id_comment, limit } = req.params;
      const total = await modelCommentFeedBack.find({idComment: id_comment}).exec();
      
      const rs = await modelCommentFeedBack
        .find({ idComment: id_comment })
        .limit(limit)
        .exec();
      const dem = total.length === rs.length ? total.length: total.length - rs.length;
      res.json({ arr: [...rs] , total: total.length - rs.length });
    } catch (e) {
      console.log(">>>Lỗi lấy các bình luận feeed back: ", e);
    }
  }
  async count(req,res,next){
    try{
      const { id_comment  } = req.params;
      const total = await modelCommentFeedBack.find({idComment: id_comment}).exec();
      res.json({total: total.length});
    }catch(e){
      console.log(">>>Lỗi đếm feedback", e);
    }
  }
  async create(req, res, next) {
    try {
      const { idVideo, idUser, noidung, id_comment } = req.body;
      const commentFeedBack = new modelCommentFeedBack({
        idVideo: idVideo,
        idUser: idUser,
        noidung: noidung,
        idComment: id_comment,
      });
      await commentFeedBack.save();
      return res.json({ message: "bình luận thành công !!" });
    } catch (e) {
      console.log(">>>thêm bình luận: ", e);
    }
  }
}
module.exports = new CommentFeedBack();
