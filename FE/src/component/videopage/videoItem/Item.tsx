import { useContext, useEffect, useRef, useState } from "react";
import { VideoPageContext } from "../VideoPageContext";
import style from "./VideoItem.module.scss";
import classNames from "classnames/bind";
import { MusicAnim } from "@/component/iconAnimations/page";
import { PlayOutlineIcon } from "../../../../public/icons/icons";
import Link from "next/link";
const cx = classNames.bind(style);

function Item({ data }: any) {
  const { CurrentVideo , CurrentUser }: any = useContext(VideoPageContext);
  const checkPlay = () => {
    return data?._id === CurrentVideo?._id;
  };
  const videoRef = useRef<any>(null);
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleMouseOver = () => {
      if (videoElement) {
        videoElement.play();
      }
    };

    const handleMouseOut = () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    };

    if (videoElement) {
      videoElement.addEventListener("mouseover", handleMouseOver);
      videoElement.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mouseover", handleMouseOver);
        videoElement.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [videoRef]);
  return (
    <div className={cx("item")}>
      <Link href={`/video/${data?._id}/${CurrentUser?.sub}`}>
        <video
          ref={videoRef}
          src={`http://localhost:5432/videos/${data?.path}`}
          playsInline
          loop
          muted
          style={{cursor: "pointer"}}
        ></video>
      </Link>

      {checkPlay() && (
        <>
          <div className={cx("coating")}></div>
          <div className={cx("on-load")}>
            <MusicAnim />
            <p>Hiện đang phát</p>
          </div>
        </>
      )}

      <div className={cx("play-btn")}>
        <PlayOutlineIcon />
        <p>1.4M</p>
      </div>
    </div>
  );
}

export default Item;
