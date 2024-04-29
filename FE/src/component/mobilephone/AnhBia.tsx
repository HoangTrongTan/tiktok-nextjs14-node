import {
  ArrowDownIcon,
  ArrowLeftOulineIcon,
  BellIcons,
  ConvertIcons,
  EllipsisHorizontalIcon,
  HeartHideEyeIcons,
  PlayOutlineIcon,
  RectLoadIcons,
  TabsHightLightIcons,
} from "../../../public/icons/icons";
import style from "./AnhBia.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import video from "../../../public/video/vd2.mp4";
import useAuth from "@/hooks/useAuth";
function AnhBia() {
  const { user } = useAuth();
  const render = () => {
    let renders = [];
    for (let i = 0; i <= 7; i++) {
      renders.push(
        <div className={cx("vd-item")}>
          <div className={cx("templates")}>
            <PlayOutlineIcon width={"10px"} height={"10px"} />
            <p>1000</p>
          </div>
        </div>
      );
    }
    return renders;
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <span>
          <ArrowLeftOulineIcon />
        </span>
        <p>
          <span>
            <BellIcons />
          </span>
          <span>
            <EllipsisHorizontalIcon />
          </span>
        </p>
      </div>
      <div className={cx("body1")}>
        <img
          src={user.picture ? user.picture : ""}
          alt=""
        />
        <p>Hoàng trọng tần</p>
        <RectLoadIcons />
      </div>
      <div className={cx("body2")}>
        <div>
          <TabsHightLightIcons />
        </div>
        <ConvertIcons />
        <HeartHideEyeIcons />
      </div>
      <div className={cx("box-video")}>
        <div className={cx("vd-item-video")}>
          <video src={video}></video>
          <div className={cx("templates")}>
            <PlayOutlineIcon width={"10px"} height={"10px"} />
            <p>1000</p>
          </div>
        </div>
        { render() }

      </div>
    </div>
  );
}

export default AnhBia;


