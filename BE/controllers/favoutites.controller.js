const modelFav = require("../models/favourites.models");
const modelVideo = require("../models/video.models");

class Favourites {
  async increaseHeart(req, res, next) {
    try {
      // id_video , id_user
      if (req.checkUserFavourites) {
        const rs = await modelFav.deleteOne({
          idUser: req.body.idUser,
          idVideos: req.body.idVideos,
        });
        return res.json({
          message: "Đã xóa video này khỏi yêu thích!!",
        });
      }
      const rs = await modelFav.create(req.body);
      return res.json({
        message: "Đã thêm vào yêu thích!!",
      });
    } catch (e) {
      console.log(">>>Lỗi tăng like: ", e, req.body);
    }
  }
  //[GET] /api/favourites/getvideo/:id
  async getVideoByUser(req, res, next) {
    try {
      const { id } = req.params;
      const countVideo = await modelFav.find({ idUser: id });
      const countFavourites = await Promise.all(
        countVideo.map(async (item) => {
          const obj = await modelVideo.findOne({ _id: item.idVideos });
          return obj;
        })
      );
      res.json(countFavourites);
    } catch (e) {
      console.log(">>>Lỗi tăng like: ", e, req.body);
    }
  }
}

module.exports = new Favourites();
