import classNames from "classnames/bind";
import style from "./Mess.module.scss";
import { EllipsisHorizontalIcon } from "../../../public/icons/icons";
import useFetchRecipientUser from "@/hooks/useFetchRecipientUser";
import { useContext } from "react";
import { MessageContext } from "./MessageContext";
import { setCurrentChat } from "@/redux/storeMess/states/stateChat";
const cx = classNames.bind(style);

function ItemMess({data}:any) {
  const { user , handleSetCurrentChat }:any = useContext(MessageContext);
  const { stateUser }:any = useFetchRecipientUser(data?.idUserMember , user?.sub );

  return (
    <div className={cx("item")} onClick={() => handleSetCurrentChat(setCurrentChat, data)}>
      <img
        src={stateUser?.image}
        alt=""
      />
      <div className={cx('content')}>
        <p>{stateUser?.username}</p>
        <p>ok nha !! 17/03/2024</p>
      </div>
      <div className={cx('options')}>
        <EllipsisHorizontalIcon />
      </div>
    </div>
  );
}

export default ItemMess;
