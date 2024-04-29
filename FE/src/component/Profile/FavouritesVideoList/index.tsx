import classNames from "classnames/bind";
import style from "../Profile.module.scss";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import * as FavouritesReq from "../../../api-service/favourites";
import Item from "../item";

const cx = classNames.bind(style);
function FavouritesVideoList() {
  const { idUser, dataCreator }: any = useContext(ProfileContext);

  return (
    <div className={cx("box-video__list")}>
      <div className={cx("list-video")}>
        {dataCreator && dataCreator?.map((ite: any, _i: any) => <Item data={ite} key={_i} />)}
      </div>
    </div>
  );
}

export default FavouritesVideoList;
