const modelUsers = require("../models/user.models");
const modelVideos = require("../models/video.models");
const modelLikeComments = require("../models/like.comment.models");

const likes = async (req, res, next) => {
  try {
    const { dataNotifications } = req;
    const { idUser } = req.params;
    let getData = await Promise.all(
      dataNotifications.map(async (ite) => {
        const temp = [];
        const likeCmt = await modelLikeComments.find({
          idComment: ite._id,
          idUser: { $ne: idUser },
        });
        if (likeCmt.length > 0) {
          for (let lk of likeCmt) {
            const user = await modelUsers.findOne({ sub: lk.idUser });
            temp.push(user?._doc);
          }

          const video = await modelVideos.findOne({ _id: ite.idVideo });
          return {
            noidung: ite.noidung,
            datelikes: likeCmt.at(-1).createdAt,
            user: temp || [], // Gán mảng rỗng nếu temp là undefined
            video,
          };
        }
      })
    );
    // Remove null values
    getData = getData.filter((obj) => obj !== undefined);
    // console.log(getData);
    res.json(getData);
  } catch (e) {
    console.log("middlewware gets likes comment: ", e);
  }
};
module.exports = { likes };
