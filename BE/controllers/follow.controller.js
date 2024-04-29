const modelFollow = require("../models/follow.models");

class Follow {
  async create(req, res, next) {
    try {
      const { idUserMember } = req.body;
      if (req.checkUserFollow) {
        await modelFollow.deleteOne({ idUserMember: { $in: idUserMember } });
        return res.json({
          message: "đã bỏ follow !",
        });
      }
      await modelFollow.create(req.body);
      return res.json({
        message: "đã follow !",
      });
    } catch (e) {
      console.log(">>>Lỗi follow: ", e);
    }
  }
  //[GET] /api/follow/show/:idUser/:idFriends
  async show(req, res, next) {
    try {
      const { idUser, idFriends } = req.params;
      const model = await modelFollow.findOne({
        idUserMember: { $all: [idUser, idFriends] },
      });
      res.json(model);
    } catch (e) {
      console.log(">>>Lỗi show follow: ", e);
    }
  }
  async accept(req, res, next) {
    try {
      const { idUserMember } = req.body;
      await modelFollow.findOneAndUpdate(
        { idUserMember: { $all: idUserMember } },
        { isSuccess: true },
        { new: true }
      );
      res.json({ message: "các bạn đã trở thành bạn bè của nhau 😘😘" });
    } catch (e) {
      console.log(">>>Lỗi show follow: ", e);
    }
  }
  //[DELETE] /api/follow/unfollow/:idUser/:idFriends
  async unFollow(req, res, next) {
    try {
      const { idUser, idFriends } = req.params;
      await modelFollow.deleteOne(
        { idUserMember: { $all: [idUser, idFriends] } }
      );
      res.json({ message: "Đã hủy follow 😗😗 !!" });
    } catch (e) {
      console.log(">>>Lỗi hủy follow: ", e);
    }
  }
  //[DELETE] /api/follow/show-list-friends/:id
  async showListFriends(req, res, next) {
    try {
      const { id } = req.params;
      const result = await modelFollow.find({ idUserMember: { $in: id } });
      res.json(result);
    } catch (e) {
      console.log(">>>Lỗi hủy follow: ", e);
    }
  }
}

module.exports = new Follow();
