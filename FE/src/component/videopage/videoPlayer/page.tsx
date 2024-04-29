import { memo, useContext, useEffect } from "react";
import { VideoPageContext } from "../VideoPageContext";
import style from "../large/VideoLarge.module.scss";
import { redirect } from 'next/navigation'
import Link from "next/link";
function VideoPlayer() {
  const { CurrentVideo , videRef , handlePause }:any = useContext(VideoPageContext);
  
  return (
    <div className={style["video-player"]} onClick={handlePause}>
        <video ref={videRef} src={`http://localhost:5432/videos/${CurrentVideo.path}`}></video>
    </div>
  );
}

export default memo( VideoPlayer );
