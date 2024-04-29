import styles from "./VideoActions.module.scss";
import {
  FavoritesIcon,
  HeartIcon,
  MessagesIcon,
  ShareIcon,
} from "../../../../public/icons/icons";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { ContextVideo } from "../VideoContext";
import useAuth from '@/hooks/useAuth';
import * as LikeVdReq from "../../../api-service/like-video";
import * as FavoutitesVdReq from "../../../api-service/favourites";
function VideoActions({ data }: any) {
  // console.log("DATA ", data);

  const [heartCommentCount, setHeartCommentCount] = useState<any>({});
  const { checkLikesUser }: any = useContext(ContextVideo);
  const { user } = useAuth();
  const getCount = async () => {
    try {
      if (data._id) {
        const rs = await axios.get(
          `http://localhost:5432/api/video/show-actions/one/${data._id}`
        );
        // console.log("DATA THẢ TIM:. ", rs.data);

        setHeartCommentCount(rs.data);
      }
    } catch (e) {
      message.error("lỗi lấy lượt thả tim và bình luận !!", 3);
      console.log("lỗi lấy lượt thả tim và bình luận !!", e);
    }
  };
  useEffect(() => {
    getCount();  
  }, [data]);
  const handleLikeVideo = () => {    
    LikeVdReq.like({
      idVideo: data?._id,
      idUser: user?.sub,
    });
    getCount();
    getCount();
  };
  const handleFavouritesVideo = () => {
    FavoutitesVdReq.like({
      idVideos: data?._id,
      idUser: user?.sub,
    });
    getCount();
    getCount();
  }
  const handleShareVideo = () => {

  }
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["button-item"]}>
        <div
          className={`${styles["drop-heart"]} ${styles["icons"]} ${
            heartCommentCount?.userLikes?.some(
              (ite: string) => ite === user?.sub
            )
              ? styles["icons-heart-red"]
              : ""
          } `}
          onClick={handleLikeVideo}
        >
          <HeartIcon />
        </div>
        <p>{heartCommentCount.heart_quanlity}</p>
      </div>
      <div className={styles["button-item"]}>
        <div className={`${styles["comment"]} ${styles["icons"]}`}>
          <MessagesIcon />
        </div>
        <p>{heartCommentCount.total_comment_quanlity}</p>
      </div>
      <div className={styles["button-item"]} onClick={handleFavouritesVideo}>
        <div className={`${styles["favourites"]}  ${styles["icons"]} ${
            heartCommentCount?.userFavourites?.some(
              (ite: string) => ite === user?.sub
            )
              ? styles["icons-favourites-yellow"]
              : ""
          }`}>
          <FavoritesIcon />
        </div>
        <p>{heartCommentCount.countFavourites}</p>
      </div>
      <div className={styles["button-item"]}>
        <div className={`${styles["favourites"]} ${styles["icons"]} `} onClick={handleShareVideo}>
          <ShareIcon />
        </div>
        <p>0</p>
      </div>
    </div>
  );
}

export default memo(VideoActions);
