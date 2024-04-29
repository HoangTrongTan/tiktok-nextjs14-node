import classNames from "classnames/bind";
import style from "../Mess.module.scss";
import ItemMess from "../Item";
import { memo, useContext } from "react";
import { MessageContext } from "../MessageContext";
const cx = classNames.bind(style);

function ListUser() {
  const { chat }:any = useContext(MessageContext);
  return (
    <div className={cx("list-box")}>
      {
        chat.dataListUser && chat.dataListUser.map( (ite:any,i:any) => (
          <ItemMess key={i} data={ite}  />
        ) )
      }
    </div>
  );
}

export default memo(ListUser);
