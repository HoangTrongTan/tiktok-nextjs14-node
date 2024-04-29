const modelUsers = require("../models/user.models");
const modelVideos = require("../models/video.models");
const modelComment = require("../models/comment.models");
const modelLikeVideos = require("../models/like.video.models");
const modelLikeComments = require("../models/like.comment.models");
const modelCommentFeedBack = require("../models/comment.feedback.models");

class Notification {
  // [GET] /api/notifi/likes/:idUser
  async getLikes(req, res, next) {
    try {
      const { idUser } = req.params;
      const data = await modelComment.find({ idUser });
      req.dataNotifications = data;
      next();      
    } catch (e) {
      next(e);
      console.log(">>>Lỗi gọi dữ liệu likes: ", e);
    }
  }
  
  // [GET] /api/notifi/likes-feedback/:idUser
  async likeFeedbacks(req, res, next) {
    try {
      const { idUser } = req.params;
      const data = await modelCommentFeedBack.find({ idUser });
      req.dataNotifications = data;
      next();      
    } catch (e) {
      next(e);
      console.log(">>>Lỗi gọi dữ liệu likes: ", e);
    }
  }

  // [GET] /api/notifi/likes-video/:idChuSoHuu
  async likesVideo(req, res, next) {
    try {
      const { idChuSoHuu } = req.params;
      const data = await modelVideos.find({ idChuSoHuu });
      
      let getData = await Promise.all(
        data.map(async (ite) => {
          const temp = [];
          const likeVd = await modelLikeVideos.find({
            idVideo: ite._id,
            idUser: { $ne: idChuSoHuu },
          });
          if (likeVd.length > 0) {
            for (let lk of likeVd) {
              const user = await modelUsers.findOne({ sub: lk.idUser });
              temp.push(user?._doc);
            }
            return {
              datelikes: likeVd.at(-1).createdAt,
              user: temp || [], // Gán mảng rỗng nếu temp là undefined
              video: {...ite?._doc},
            };
          }
        })
      );
      res.json(getData);
    } catch (e) {
      console.log(">>>Lỗi gọi dữ liệu likes videos: ", e);
    }
  }
  // [GET] /api/notifi/comment/:idChuSoHuu
  async comment(req, res, next) {
    try {
      const { idChuSoHuu } = req.params;
      const data = await modelVideos.find({ idChuSoHuu });
      const temp = [];
      await Promise.all( data.map( async item => {
        const cmt = await modelComment.find({ idVideo: item._id , idUser: { $ne: idChuSoHuu } });
        for( let ite_cmt of cmt ){

          const user = await modelUsers.findOne({ sub: ite_cmt.idUser });
          const video = await modelVideos.findOne({  _id: ite_cmt.idVideo });
          temp.push({
            noidung: ite_cmt.noidung,
            datelikes: ite_cmt.createdAt,
            user,
            video
          });
        }
      } ) );
      res.json(temp);
    } catch (e) {
      next(e);
      console.log(">>>Lỗi gọi dữ liệu likes: ", e);
    }
  }

  // [GET] /api/notifi/likes/:idUser
  async getCmtFeedBack(req, res, next) {
    try {
      const { idUser } = req.params;
      const data = await modelComment.find({ idUser });
      const temp = [];
      await Promise.all( data.map( async ite  => {
          const modelFeedBack = await modelCommentFeedBack.find( { idComment: ite._id , idUser: { $ne: idUser } } );
          for( let ite_cmt of modelFeedBack ){
            const user = await modelUsers.findOne({ sub: ite_cmt.idUser });
            const video = await modelVideos.findOne({  _id: ite_cmt.idVideo });
            temp.push({
              feedback: ite_cmt.noidung,
              datelikes: ite_cmt.createdAt,
              noidung: ite.noidung,
              user,
              video
            });
          }
      }) );
      res.json(temp);
    } catch (e) {
      next(e);
      console.log(">>>Lỗi gọi dữ liệu likes: ", e);
    }
  }
}

module.exports = new Notification();
