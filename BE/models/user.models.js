const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId,},
      sub:{
        type: String,
        required: true, // Đánh dấu sub là bắt buộc để tham chiếu chính xác
        unique: true, // Đảm bảo giá trị sub là duy nhất cho từng người dùng
      },
      username: String,
      email: String,
      image: String,
      nickName: String,
      idTiktok: String,
      isShowLikeVideo: { type: Boolean, default: false } 
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
