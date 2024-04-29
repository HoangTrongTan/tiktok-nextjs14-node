const mongoose = require("mongoose");

const Favourite = mongoose.model(
  "Favourite",
  new mongoose.Schema(
    {
        idUser: String,
        idVideos: String
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Favourite;
