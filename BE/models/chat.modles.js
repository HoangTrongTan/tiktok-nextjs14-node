const mongoose = require("mongoose");

const ChatMessage = mongoose.model(
  "ChatMessage",
  new mongoose.Schema(
    {
        idSender: String,
        text: String,
        idFollow: String,
        image: String,
        link: String
    },
    {
      timestamps: true,
    }
  )
);

module.exports = ChatMessage;
