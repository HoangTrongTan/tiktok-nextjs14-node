const modelVideo = require("../models/video.models");
const modelUser = require("../models/user.models");
const modelLikeVideo = require("../models/like.video.models");
const modelCommentVideo = require("../models/comment.models");
const modelFeedBackComment = require("../models/comment.feedback.models");
const modelFavourites = require("../models/favourites.models");
const path = require("path");
// const ffmpeg = require('fluent-ffmpeg');
var ffmpeg = require("ffmpeg");
class Video {
  async index(req, res, next) {
    try {
      const id_user = req.params.id;
      const videos = await modelVideo
        .find({ idChuSoHuu: { $ne: id_user } })
        .exec();
      // Lặp qua mỗi video để thêm thông tin user vào
      let deepCopyObject = JSON.parse(JSON.stringify(videos));
      for (let i = 0; i < videos.length; i++) {
        const video = deepCopyObject[i];
        const user = await modelUser.findOne({ sub: video.idChuSoHuu }).exec(); // Đây là giả sử video có trường userId chứa id của user
        if (user) {
          // Nếu tìm thấy user, gán thông tin user vào trường user của video
          video.user = user;
        }
      }
      // console.log("Deep objects:..", deepCopyObject);
      ///
      if (videos) {
        return res.status(200).json(deepCopyObject);
      }
      return res.status(200).json([]);
    } catch (e) {
      console.log(">>>Lỗi get tất cả dữ liệu: ", e);
    }
  }
  //[POST] api/video/create
  async create(req, res, next) {
    try {
      const videoPath = path.join(
        __dirname,
        "../public/videos/",
        req.file.filename
      );
      const screenshotPath = await createScreenshot(
        videoPath,
        req.file.filename
      );
      const newVideo = new modelVideo({
        path: req.file.filename,
        idChuSoHuu: req.body.idChuSoHuu,
        ghiChu: req.body.ghiChu,
        music: req.body.music,
        anhBia: screenshotPath
      });
      const rs = await newVideo.save();
      res.json({ message: "upload sucess !!", data: rs });
    } catch (e) {
      console.log(">>>Lỗi tạo video: ", e);
    }
  }
  // [PUT] api/video/increate-like
  async increaseHeart(req, res, next) {
    try {
      // id_video , id_user
      if (req.checkUserLike) {
        const rs = await modelLikeVideo.deleteOne({
          idUser: req.body.idUser,
          idVideo: req.body.idVideo,
        });
        return res.json({
          message: "Bạn đã bỏ thích video này !!",
        });
      }
      const rs = await modelLikeVideo.create(req.body);
      return res.json({
        message: "Đã thích video !!",
      });
    } catch (e) {
      console.log(">>>Lỗi tăng like: ", e, req.body);
    }
  }
  // [post] api/video/increase-comment
  async increaseComment() {
    try {
    } catch (e) {}
  }

  // [GET] api/video/show-actions/:id
  async show_actions(req, res, next) {
    try {
      const { id } = req.params;
      const heart_quanlity = await modelLikeVideo.find({ idVideo: id });
      const countComment = await modelCommentVideo.countDocuments({
        idVideo: id,
      });
      const countFeedBackComment = await modelFeedBackComment.countDocuments({
        idVideo: String(id),
      });
      const countFavourites = await modelFavourites.find({
        idVideos: String(id),
      });
      res.json({
        heart_quanlity: heart_quanlity.length,
        total_comment_quanlity: countComment + countFeedBackComment,
        countFavourites: countFavourites.length,
        userLikes: heart_quanlity.map((ite) => ite.idUser), // Sử dụng mảng trống nếu videoCount không tồn tại hoặc không có idUser
        userFavourites: countFavourites.map((ite) => ite.idUser), // Sử dụng mảng trống nếu videoCount không tồn tại hoặc không có idUser
      });
    } catch (e) {
      console.log(">>>Lỗi showw thả tim video: ", e);
      res.json({});
    }
  }
  // [GET] api/video/one/:id_video/:id_user
  async getOne(req, res, next) {
    try {
      const { id_video, id_user } = req.params;
      const video = await modelVideo.findOne({ _id: id_video }).exec();
      const user = await modelUser.findOne({ sub: id_user }).exec();

      res.json({
        video,
        user,
      });
    } catch (e) {
      console.log(">>>Lỗi tạo video: ", e);
    }
  }
  async showByUser(req, res, next) {
    try {
      const { id_user } = req.params;
      const rs = await modelVideo.find({ idChuSoHuu: id_user });
      // const newRs = rs.map( async (ite) => {

      // } );
      res.json(rs);
    } catch (e) {
      console.log(">>>Lỗi tạo video: ", e);
    }
  }
  // [GET] api/video/show/like/list/:id
  async getLikeVideoList(req, res, next) {
    try {
      const { id } = req.params;
      const countVideo = await modelLikeVideo.find({ idUser: id });
      const countFavourites = await Promise.all(
        countVideo.map(async (item) => {
          const obj = await modelVideo.findOne({ _id: item.idVideo });
          return obj;
        })
      );
      res.json(countFavourites);
    } catch (e) {
      console.log(">>>Lỗi show video: ", e);
    }
  }
}

module.exports = new Video();
// Hàm để lấy ảnh và lưu vào file
async function createScreenshot(videoPath, filename) {
  const outputPath = path.join(__dirname, "../public/image/");
  let newFilename = "";
  try {
    const process = new ffmpeg(videoPath);
    const video = await process;
    const extractedFile = await video.fnExtractFrameToJPG(
      outputPath,
      { number: 1 }
    );
    if (extractedFile) {
      const parsedPath = path.parse(filename);
      newFilename = `${parsedPath.name}_1.jpg`;
    }
    return newFilename;
  } catch (error) {
    console.error("Error creating screenshot:", error);
    return ""; // Indicate error (optional)
  }
}
