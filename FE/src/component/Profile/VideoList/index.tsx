import classNames from "classnames/bind";
import style from "../Profile.module.scss";
import Item from "../item";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
const cx = classNames.bind(style);
function VideoList() {
  const { dataCreator } : any = useContext(ProfileContext);
  
  return (
    <div className={cx("box-video__list")}>
      <p className={cx("tlt")}>Video</p>
      <div className={cx('list-video')}>
        {
          dataCreator && dataCreator?.map( (ite:any, _i : any) => (
            <Item data={ite} key={_i} />
          ) )
        }
    </div>
    </div>
  );
}

export default VideoList;
