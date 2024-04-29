import {
  EllipsisHorizontalIcon,
  HeartBorderIcon,
  HeartIcon,
} from "../../../public/icons/icons";
import { useContext, useEffect, useState } from "react";
import BoxInput from "./boxInput";
import style from "./CommentUser.module.scss";
import classNames from "classnames/bind";
import PopupProfileUser from "../PopupProfileUser";
import OptionsButton from "../OptionsButton/page";
import * as FeedBackReq from "../../api-service/feedbackComment";
import * as LikeCommentReq from "../../api-service/like";
import * as CommentReq from "../../api-service/comment";
import axios from "axios";
import { VideoPageContext } from "../videopage/VideoPageContext";

import { Modal, message } from "antd";
import useAuth from "@/hooks/useAuth";
const cx = classNames.bind(style);
function ItemComment({ data, smallImg, setChangeComp, setFeedBack }: any) {
  const getId = () => {
    return data?._id_real ? data?._id_real : data?._id;
  };
  const [showBoxInput, setShowBoxInput] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const { user } = useAuth();
  const { CurrentUser, getComment, getCount }: any =
    useContext(VideoPageContext);
  const [showLike, setShowLike] = useState<any>({ idUser: [] });
  const [open, setOpen] = useState<any>(false);
  const getLikes = async () => {
    const res = await LikeCommentReq.show(getId());

    setShowLike(res);
  };
  useEffect(() => {
    getLikes();
  }, [user]);
  useEffect(() => {
    const useGetUser = async () => {
      try {
        const rs = await axios(
          `http://localhost:5432/api/user/get/${data?.idUser}`
        );

        setUserData(rs.data);
      } catch (e) {
        console.log("Lỗi lấy user:.", e);
      }
    };
    useGetUser();
  }, [data]);
  const handlePost = (id_video: string, curent_user: string, text: string) => {
    FeedBackReq.addFeedBackComment({
      idVideo: id_video,
      idUser: curent_user,
      noidung: text,
      id_comment: data._id,
    });
    setChangeComp((prev: any) => prev + 1);
    getCount();
    setFeedBack();
  };
  const handleLike = async () => {
    LikeCommentReq.like({
      idComment: getId(),
      idUser: user.sub,
    });
    await getLikes();
    await getLikes();
  };
  const checkAuthor = () => {
    return data?.idUser === CurrentUser?.sub;
  };
  const checkUserComment = () => {
    return data?.idUser === user?.sub;
  };
  const btnOpenDelete = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    const id = getId();
    const rs = await CommentReq.delComment(String(id));
    message.success(rs.message, 2);
    if (setChangeComp) {
      setChangeComp((prev: Number) => Number(prev) + 1);
    }
    getCount();
    setOpen(false);
    getComment();
    setFeedBack();
  };
  const isFull = false;
  return (
    <>
      <div className={cx("wrapper", { smallImg: smallImg })}>
        <PopupProfileUser>
          <img src={userData?.image} alt="anh" />
        </PopupProfileUser>
        <div style={{ flex: 1 }}>
          <div className={style["info--head"]}>
            <div className={style["left"]}>
              <div className={style["name"]}>
                <span>{userData?.username}</span>
                <span>.</span>
                {checkAuthor() && <span className={cx("author")}>Tác giả</span>}
              </div>
              <p className={style["content"]}>{data?.noidung}</p>
              <div className={style["actons"]}>
                <span>{data?.createdAt}</span>
                {isFull && <HeartBorderIcon />}
                <p onClick={() => setShowBoxInput(true)}>Trả lời</p>
              </div>
              {/* -----------Box answer-------------- */}

              {/* --------------------------- */}
            </div>
            <div className={style["right"]}>
              <OptionsButton
                onlyReport={true}
                hoverPink
                onlyDelete={
                  checkUserComment()
                    ? {
                        type: true,
                        callback: btnOpenDelete,
                      }
                    : {}
                }
              >
                <div className={style["options-btn"]}>
                  <EllipsisHorizontalIcon />
                </div>
              </OptionsButton>
              <div className={style["drop-heart"]} onClick={handleLike}>
                {showLike?.idUser?.some((ite: any) => ite === user?.sub) ? (
                  <span style={{ color: "red" }}>
                    <HeartIcon width={"20"} height={"20"} />
                  </span>
                ) : (
                  <HeartBorderIcon />
                )}
              </div>

              <p>{showLike?.idUser?.length}</p>
            </div>
          </div>
          {showBoxInput && (
            <BoxInput
              setShowBoxInput={setShowBoxInput}
              handleClick={handlePost}
            />
          )}
        </div>
      </div>

      <Modal
        open={open}
        footer={""}
        onCancel={() => setOpen(false)}
        width={310}
      >
        <div className={cx("modal-del_wrap")}>
          <h3 className={cx("modal-txt")}>
            Bạn có chắc muốn xóa bình luận này !!
          </h3>
          <div className={cx("modal-btn")}>
            <p onClick={handleDelete}> Xóa </p>
          </div>
          <div className={cx("modal-btn")}>
            <p onClick={() => setOpen(false)}> Hủy</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ItemComment;
