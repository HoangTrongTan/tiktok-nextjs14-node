import { useEffect, useRef } from "react";
import { EllipsisHorizontalIcon, PlayOutlineIcon } from "../../../public/icons/icons";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
const cx = classNames.bind(style);
function Item({ data }: any) {
  // const checkPlay = () => {
  //   return data?._id === CurrentVideo?._id;
  // };
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

  const Compact = (str:string) => {
    if(str.length > 21){
      return str.substring(0, 20) + "...";
    }

    return str;
  }
  return (
    <div className={cx("item")}>
      {/* <Link href={`/video/${data?._id}/${CurrentUser?.sub}`}> */}
      <video
        ref={videoRef}
        src={`http://localhost:5432/videos/${data.path}`}
        playsInline
        loop
        muted
        style={{ cursor: "pointer" }}
      ></video>
      {/* </Link> */}

      <div className={cx("play-btn")}>
        <PlayOutlineIcon />
        <p>1.4M</p>
      </div>

      <div className={cx('content')}>
            <p className={cx('content-txt')}>{Compact(data.ghiChu)}</p>
            <p className={cx('options')}><EllipsisHorizontalIcon width={"10px"} height={"10px"} /></p>
      </div>
    </div>
  );
}
export default Item;
  