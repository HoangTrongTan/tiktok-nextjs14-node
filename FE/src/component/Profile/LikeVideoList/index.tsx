import classNames from "classnames/bind";
import style from "../Profile.module.scss";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import Item from "../item";
import * as LikeReq from "../../../api-service/like";
import { LookUpOutLineIcon } from "../../../../public/icons/icons"; 
import useAuth from "@/hooks/useAuth";

const cx = classNames.bind(style);
function LikeVideoList() {
  const { idUser, data }: any = useContext(ProfileContext);
  const [dataFavourites, setDataFavourites] = useState<any>([]);
  const { user } = useAuth();
  const getDataLikeVideo = async () => {
    if (idUser) {
      const res = await LikeReq.showVideoLikeList(idUser);
      setDataFavourites(res);
    }
  };
  useEffect(() => {
    if (data.isShowLikeVideo || data.sub === user?.sub) {
      getDataLikeVideo();
    }
  }, [idUser]);
  // console.log("sdasda", dataFavourites);

  return (
    <div className={cx("box-video__list")}>
      {data.isShowLikeVideo || data.sub === user?.sub ? (
        <div className={cx("list-video")}>
          {dataFavourites &&
            dataFavourites?.map((ite: any, _i: any) => (
              <Item data={ite} key={_i} />
            ))}
        </div>
      ) : (
        <div className={cx("private")}>
          <p className={cx("private-icons")}>
            <LookUpOutLineIcon />
          </p>
          <p className={cx("private-bold")}>
            Video đã thích của người dùng này ở trạng thái riêng tư
          </p>
          <p className={cx("private-normal")}>
            Các video được thích bởi {data?.username} hiện đang ẩn
          </p>
        </div>
      )}
    </div>
  );
}

export default LikeVideoList;
