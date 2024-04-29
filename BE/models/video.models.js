const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video",
  new mongoose.Schema(
    {
      path: String,
      idChuSoHuu:String,
      ghiChu: String,
      music: String,
      AllowComment: { type: Boolean , default: true  },
      quangcao: { type: Boolean , default: false  },
      anhBia: String,
      tags: { type: Array, default: [] }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Video;
