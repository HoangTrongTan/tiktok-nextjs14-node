import Button from "@/component/Button/page";
import style from "./FixVideo.module.scss";
import classNames from "classnames/bind";
import { ScissorsIcons } from "../../../../public/icons/icons";
const cx = classNames.bind(style);

function FixVideo() {
  return (
    <div className={cx("wrapper")}>
      <p>1</p>
      <div className={cx('video-time')}>
        <video src=""></video>
        <div>
          <p>2024-03-02 11-57-21</p>
          <p>00:00 - 00:17 17s</p>
        </div>
      </div>
      <Button text={"Chỉnh sửa video"} iconLeft={<ScissorsIcons />} primary />
    </div>
  );
}

export default FixVideo;
