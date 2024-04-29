const mongoose = require("mongoose");

const CommentFeedBack = mongoose.model(
  "CommentFeedBack",
  new mongoose.Schema(
    {
        idVideo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        },
        idComment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        },
        idUser: String,
        noidung:String 
    },
    {
      timestamps: true,
    }
  )
);

module.exports = CommentFeedBack;
