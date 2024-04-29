import CommentUser from "@/component/CommentUser/page";
import style from "./Comments.module.scss";
import BoxInput from "@/component/CommentUser/boxInput";
import { useContext } from "react";
import { VideoPageContext } from "../VideoPageContext";
import * as CommentReq from '../../../api-service/comment';
function Comment({ data }: any) {
  const { comment , getCount } : any = useContext(VideoPageContext);
  const handlePost = (id_video : string, curent_user : string , text: string) => {
      CommentReq.addComment({
        idVideo: id_video,
        idUser: curent_user,
        noidung: text,
      });
      getCount();
  }
  return (
    <div className={style["wrapper"]}>
      {
        comment && comment?.map( (ite :any, i: any) => (
          <CommentUser key={i} data={ite} />
        ) )
      }
      <div className={style["post-comment"]}>
        <BoxInput clearClose small handleClick={handlePost}/>
      </div>
    </div>
  );
}

export default Comment;
