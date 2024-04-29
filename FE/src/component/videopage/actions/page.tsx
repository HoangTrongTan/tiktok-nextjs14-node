import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import {
  CodesIcon,
  FaceBgIcon,
  FavoritesIcon,
  HeartIcon,
  MessagesIcon,
  PlaneBgIcon,
  ShareIcon,
  TwiterBgIcon,
  WhatsAppBgIcon,
} from "../../../../public/icons/icons";
import style from "../large/VideoLarge.module.scss";
import { useContext } from "react";
import { VideoPageContext } from "../VideoPageContext";
import * as LikeReq from '../../../api-service/like-video';
import useAuth from "@/hooks/useAuth";

function Actions() {
  const {heartCommentCount , CurrentUser , CurrentVideo , getCount} : any = useContext(VideoPageContext);
  const { user } = useAuth();
  const handleLike = async () => {
    LikeReq.like({
      idVideo: CurrentVideo?._id,
      idUser: user?.sub
    });
    getCount();
  }
  // console.log("user:. ", user);
  // console.log("HEAERR comment count:. ", heartCommentCount);
  
  
  return (
    <div className={style['actions-type__icons_btn']}>
      <div className={style["actions-left_icons"]}>
        <div className={style["actions-icon"]}>
          <div onClick={handleLike} className={`${style["btn--actions__icons"]}  ${heartCommentCount?.userLikes?.some( (ite : string) => String(ite) === user?.sub ) ? style['icons-heart-red'] : ''}`  }>
            <HeartIcon width= {"20"} height={'20'} />
          </div>
          <p>{heartCommentCount.heart_quanlity}</p>
        </div>
        <div className={style["actions-icon"]}>
          <div className={style["btn--actions__icons"]}>
            <MessagesIcon width= {"20"} height={'20'}  />
          </div>
          <p>{heartCommentCount.total_comment_quanlity}</p>
        </div>
        <div className={style["actions-icon"]}>
          <div className={ ` ${style["btn--actions__icons"]}  ${heartCommentCount?.userFavourites?.some( (ite : string) => String(ite) === user?.sub ) ? style['icons-favourites-yellow'] : ''} `}  >
            <FavoritesIcon  width= {"20"} height={'20'}  />
          </div>
          <p>{heartCommentCount?.countFavourites}</p>
        </div>
      </div>
      <div className={style["actions-right_icons"]}>
        <Tippy
          animation="scale"
          delay={[0, 200]}
          content="Embed"
          placement="top"
        >
          <div className={style['cursor']} ><CodesIcon /></div>
        </Tippy>
        <Tippy
          animation="scale"
          content="Send to friends"
          placement="top"
        >
          <div className={style['cursor']}><PlaneBgIcon /></div>
        </Tippy>
        <Tippy
          animation="scale"
          content="Share to Facebook"
          placement="top"
        >
          <div className={style['cursor']}><FaceBgIcon /></div>
        </Tippy>
        <Tippy
          animation="scale"
          content="Share to WhatsApp"
          placement="top"
        >
          <div className={style['cursor']}><WhatsAppBgIcon /></div>
        </Tippy>
        <Tippy
          animation="scale"
          content="Share to Twitter"
          placement="top"
        >
          <div className={style['cursor']}><TwiterBgIcon /></div>
        </Tippy>

        <ShareIcon width={"17"} height={"17"} />
      </div>
    </div>
  );
}

export default Actions;
