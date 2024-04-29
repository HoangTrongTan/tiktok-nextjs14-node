import { useContext, useState } from "react";
import { VideoPageContext } from "../VideoPageContext";
import style from "../large/VideoLarge.module.scss";
import "../../styling/input.css";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlayButtonIcon,
} from "../../../../public/icons/icons";

function PlayNextPrevrious() {
  const { handlePlay , isplaying }: any =
    useContext(VideoPageContext);
  
  return (
    <>
      {!isplaying && (
        <div className={style["btn-play"]} onClick={ () => { handlePlay(); } }>
          <PlayButtonIcon width={"60"} height={"60"} />
        </div>
      )}
      <div className={style["next-pevrious"]}>
        <div className={`${style["pevrious-btnn"]} ${style["btn"]}`}>
          <ArrowUpIcon />
        </div>
        <div className={`${style["next-btn"]} ${style["btn"]}`}>
          <ArrowDownIcon />
        </div>
      </div>
    </>
  );
}

export default PlayNextPrevrious;
