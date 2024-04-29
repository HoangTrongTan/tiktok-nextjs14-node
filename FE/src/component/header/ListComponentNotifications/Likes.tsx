import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ListComponentNotifications.module.scss";
import ItemNotifi from "./Item";
import { GlobalContextNotifi } from "../GlobalContextNotifi";

const cx = classNames.bind(styles);
function Likes() {
  const { likesCmt , likeFeedBack , likeVideos  } : any = useContext(GlobalContextNotifi);
  return (
    <div className={cx("list-like-wrapper")}>
      <p className={cx('date-text')}>Trước đây</p>
      { 
        likesCmt && likesCmt.map( (ite:any, i:any) => (
          <ItemNotifi type={"likecmt"} data={ite} key={i} />
          ) )
      }
      {
        likeFeedBack && likeFeedBack.map( (ite:any,i:any) => (
          <ItemNotifi type={"likecmt"} data={ite} key={i} />
        ) )
      }
      {
        likeVideos && likeVideos.map( (ite:any,i:any) => (
          <ItemNotifi type={"likevd"} data={ite} key={i} />
        ) )
      }
    </div>
  );
}

export default Likes;
