import { mobileImage } from "@/utils/string";
import style from "./MobiPhone.module.scss";
import classNames from "classnames/bind";
import {
  AudioIcon,
  CompassIcon,
  ExpandedIcons,
  HeartIcon,
  HomeBgIcon,
  LettersIcon,
  LiveStreamIcon,
  MagnifyingGlass,
  MessagesIcon,
  MusicIcon,
  PlayOutlineIcon,
  ShareIcon,
  UserIcon,
} from "../../../public/icons/icons";
const cx = classNames.bind(style);
import { useContext } from "react";
import { UploadContex } from "@/app/creator-center/upload/uploadContext";
import useAuth from "@/hooks/useAuth";
function Video() {
  const { curentFile, setCurentFile } :any = useContext(UploadContex);
  // console.log(">>>Curent file video:  ", curentFile);
  const { user }  = useAuth();
  
  return (
    <>
      
      <div className={cx("screnn")}>
        <div className={cx("header")}>
          <LiveStreamIcon
            width={"35px"}
            height={"35px"}
            classnames={cx("white")}
          />
          <p>Đang Follow</p>
          <p>Dành cho bạn</p>
          <MagnifyingGlass classnames={cx("white")} />
        </div>
        <div className={cx("body")}>
          <video src={URL.createObjectURL(curentFile.originFileObj)}></video>
        </div>
        <div className={cx("footer")}>
          <div>
            <p>@hoàng trọng tần</p>
            <p>2024-03-02 11-57-21</p>
            <p>
              <MusicIcon /> nhạc gốc - hoàng trọng tần Âm thanh gốc
            </p>
          </div>
          <img
            src={user.picture ? user.picture : ""}
            alt=""
          />
        </div>
      </div>
      <div className={cx("btns")}>
        <div className={cx("btn-item")}>
          <p>
            <HomeBgIcon
              className={cx("home-icons")}
              width={"20px"}
              height={"20px"}
            />
          </p>
          <p>Home</p>
        </div>
        <div className={cx("btn-item")}>
          <p>
            <CompassIcon
              className={cx("home-icons")}
              width={"20px"}
              height={"20px"}
            />
          </p>
          <p>Discover</p>
        </div>
        <div className={cx("btn-plus")}>
          <p>+</p>
        </div>
        <div className={cx("btn-item")}>
          <p>
            <LettersIcon
              className={cx("home-icons")}
              width={"20px"}
              height={"20px"}
            />
          </p>
          <p>Inbox</p>
        </div>
        <div className={cx("btn-item")}>
          <p>
            <UserIcon
              className={cx("home-icons")}
              width={"19px"}
              height={"19px"}
            />
          </p>
          <p>Profile</p>
        </div>
      </div>
      <div className={cx("btn-tiktok")}>
        <img
          src={user.picture ? user.picture : ""}
          alt=""
        />
        <HeartIcon className={cx("icon-blur")} />
        <MessagesIcon className={cx("icon-blur")} />
        <ShareIcon className={cx("icon-blur")} />
      </div>
      <div className={cx("btn-actions-videos")}>
        <div className={cx("box-hover")}>
          <div className={cx("top")}>
            <div className={cx("left")}>
              <PlayOutlineIcon />
              <p>00:00:09/00:00:17</p>
            </div>
            <div className={cx("right")}>
              <AudioIcon />
              <ExpandedIcons />
            </div>
          </div>

          <div className="process">
            <input className="level" type="range" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
