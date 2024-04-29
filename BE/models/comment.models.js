const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
        idVideo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        },
        idUser: String,
        noidung:String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Comment;
