const mongoose = require("mongoose");

const LikeComment = mongoose.model(
  "LikeComment",
  new mongoose.Schema(
    {
      idComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
      idUser: {
        type: String,
        ref: "User", // Bây giờ tham chiếu đến model User sử dụng sub
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = LikeComment;
