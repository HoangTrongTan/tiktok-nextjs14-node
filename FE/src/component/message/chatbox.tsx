import classNames from "classnames/bind";
import style from "./Mess.module.scss";
import ListChat from "./listchat";
import InputBox from "./input";
import { useContext } from "react";
import { MessageContext } from "./MessageContext";
import useFetchRecipientUser from "@/hooks/useFetchRecipientUser";
import Link from "next/link";

const cx = classNames.bind(style);

function ChatBox() {
  const { chat, user }: any = useContext(MessageContext);
  const { stateUser }: any = useFetchRecipientUser(
    chat?.curentChat?.idUserMember,
    user?.sub
  );
  if(!chat.curentChat){
    return (
    <div className={cx("chat-box")}>

     </div>
    )
  }
  return (
    <div className={cx("chat-box")}>
      {/* ------- */}
      <Link href={`/profile/${stateUser?.sub}`}>
        <div className={cx("item", { nohover: true, borderBottom: true })}>
          <img src={stateUser?.image} alt="" />
          <div className={cx("content")}>
            <p>{stateUser?.username}</p>
            <p>ok nha !! 17/03/2024</p>
          </div>
        </div>
      </Link>
      <div className={cx("chat-container")}>
        <ListChat />
      </div>
      <InputBox />
      {/* [[[[[]]]]] */}
    </div>
  );
}

export default ChatBox;
