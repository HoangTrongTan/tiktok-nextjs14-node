import classNames from "classnames/bind";
import style from "./ListChat.module.scss";
import ItemChat from "./item";
import { useContext } from "react";
import { MessageContext } from "../MessageContext";

const cx = classNames.bind(style);
function ListChat() {
  const { message , user }: any = useContext(MessageContext);
  const renderDate = (str: string) => {
    if (str) {
      const date = new Date(str);
      return `${date.getDay()} Tháng ${
        date.getMonth() + 1
      } ${date.getFullYear()}`;
    }
    return "";
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("box-item")}>
        {message.data &&
          message.data.map((item: any, _: any) => (
            <>
              <p key={_} className={cx("time")}>{renderDate(item?.date)}</p>
              {item?.datas?.map((itemChild: any, __: any) => (
                <ItemChat key={_ + __} data={itemChild} currentUser={user} />
              ))}
            </>
          ))}
        {/* <ItemChat isRight /> */}
      </div>
    </div>
  );
}

export default ListChat;
