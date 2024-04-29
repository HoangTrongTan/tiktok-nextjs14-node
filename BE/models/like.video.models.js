const mongoose = require("mongoose");

const LikeVideo = mongoose.model(
  "LikeVideo",
  new mongoose.Schema(
    {
      idVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
      idUser: String
    },
    {
      timestamps: true,
    }
  )
);

module.exports = LikeVideo;
