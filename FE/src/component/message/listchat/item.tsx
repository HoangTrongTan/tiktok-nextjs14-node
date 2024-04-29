import classNames from "classnames/bind";
import style from "./ListChat.module.scss";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
} from "../../../../public/icons/icons";
import { useContext, useEffect, useState } from "react";
import * as UserReq from "../../../api-service/user";
import * as MessageReq from "../../../api-service/message";
import OptionsMessage from "../Poppover";
import { MessageContext } from "../MessageContext";
import Link from "next/link";

const cx = classNames.bind(style);
function ItemChat({ data, currentUser }: any) {
  const { getMessage, socket, chat }: any = useContext(MessageContext);
  const [userMess, setUserMess] = useState<any>(null);
  const [like, setLike] = useState<any>(null);
  const getLikeMessage = async () => {
    const res = await MessageReq.getLikeMessage(data?._id);
    setLike(res);
  };
  useEffect(() => {
    getLikeMessage();
    const getUser = async () => {
      const res = await UserReq.getUserById(data?.idSender);
      setUserMess(() => ({ ...res, isRight: res?.sub === currentUser?.sub }));
    };
    getLikeMessage();
    getUser();
  }, []);

  useEffect(() => {
    if(!socket) return;
    socket.on("likeMessage", (res: any) => {
      getLikeMessage();
    });
    return () => {
      socket.off("likeMessage");
    }
  }, [socket]);

  const avartarLike = () => {
    return like.idUser === currentUser?.sub
      ? currentUser?.picture
      : userMess?.image;
  };
  const getReceiptId = () => {
    return chat?.curentChat?.idUserMember?.find(
      (i: any) => i !== currentUser?.sub
    );
  };
  const handleClickDisLike = async () => {
    socket.emit("like-message", getReceiptId());

    await MessageReq.postLikeMessage({
      idMessage: data?._id,
      idUser: currentUser?.sub,
    });
    getLikeMessage();
  };
  const handleLike = () => {
    handleClickDisLike();
  };
  const handleDelete = async () => {
    await MessageReq.deleteMessage(data?._id);
    getMessage();
    if (socket) {
      socket.emit("deleteChat", getReceiptId());
    }
  };
  const handleReport = () => {
    console.log("clikckckck JLKJLK");
  };
  return (
    <div className={cx("item", { isRight: userMess?.isRight })}>
      {userMess?.isRight ? (
        <OptionsMessage
          liked={like}
          del
          handleClickDisLike={handleClickDisLike}
          handleLike={handleLike}
          handleDelete={handleDelete}
          handleReport={handleReport}
        >
          <div className={cx("btn-options")}>
            <EllipsisHorizontalIcon />
          </div>
        </OptionsMessage>
      ) : (
        <Link href={`/profile/${userMess?.sub}`}><img className={cx("avartar-large")} src={userMess?.image} alt="" /></Link>
      )}
      <div className={cx("text")}>
        <p>{data.text}</p>
        {/* check heart */}
        {like && (
          <div className={cx("like", { isRight: userMess?.isRight })}>
            <span className={cx("icons-heart")}>
              <HeartIcon width={"17px"} height={"17px"} />
            </span>
            <img className={cx("avartar-small")} src={avartarLike()} alt="" />
          </div>
        )}
      </div>
      {userMess?.isRight ? (
        <Link href={`/profile/${userMess?.sub}`}><img className={cx("avartar-large")} src={userMess?.image} alt="" /></Link>
      ) : (
        <OptionsMessage
          liked={like}
          handleClickDisLike={handleClickDisLike}
          handleLike={handleLike}
          handleDelete={handleDelete}
          handleReport={handleReport}
        >
          <div className={cx("btn-options")}>
            <EllipsisHorizontalIcon />
          </div>
        </OptionsMessage>
      )}
    </div>
  );
}

export default ItemChat;
