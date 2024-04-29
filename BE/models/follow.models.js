const mongoose = require("mongoose");

const Follow = mongoose.model(
  "Follow",
  new mongoose.Schema(
    {
        idUserMember: Array,
        idSender: String,
        isSuccess: { type: Boolean, default: false },

    },
    {
      timestamps: true,
    }
  )
);

module.exports = Follow;
