import { useContext } from "react";
import Item from "./Item";
import style from "./VideoItem.module.scss";
import classNames from "classnames/bind";
import { VideoPageContext } from "../VideoPageContext";
const cx = classNames.bind(style);
function VideoItem() {
  const { CurrentUser, dataCreator }: any = useContext(VideoPageContext);

  console.log("DATAA VIDEO: ..", dataCreator);
  return (
    <div className={cx("wrapper")}>
      {dataCreator && dataCreator?.map((ite: any, i: any) => <Item key={i} data={ite} />)}
    </div>
  );
}

export default VideoItem;
