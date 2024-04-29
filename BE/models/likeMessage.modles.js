const mongoose = require("mongoose");

const LikeMessage = mongoose.model(
  "LikeMessage",
  new mongoose.Schema(
    {
        idUser: String,
        idMessage: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = LikeMessage;
