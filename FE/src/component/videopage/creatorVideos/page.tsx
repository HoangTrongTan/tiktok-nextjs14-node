import { useCallback, useContext, useEffect, useState } from "react";
import VideoItem from "../videoItem/page";
import style from "./CreatorVideo.module.scss";
import classNames from "classnames/bind";
import { VideoPageContext } from "../VideoPageContext";
const cx = classNames.bind(style);
function CreatorVideos() {
  

  return (
    <div className={cx("wrapper")}>
      <VideoItem />
    </div>
  );
}

export default CreatorVideos;
