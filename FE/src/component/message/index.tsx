"use client";
import classNames from "classnames/bind";
import style from "./Mess.module.scss";
import LayoutWithHeader from "../LayoutWithHeader/page";
import {
  ArrowLeftIcon,
  SettingsBorderCircleIcon,
} from "../../../public/icons/icons";
import ChatBox from "./chatbox";
import ListUser from "./listuser";
import { MessageProvider } from "./MessageContext";
import { Provider } from "react-redux";
import store from "../../redux/storeMess/index";
const cx = classNames.bind(style);
function Mess() {
  return (
    <LayoutWithHeader>
      <Provider store={store}>
        <MessageProvider>
          <div className={cx("wrapper")}>
            <div className={cx("box-wrapp")}>
              <p className={cx("back")}>
                <ArrowLeftIcon />
              </p>
              <div className={cx("list-user")}>
                <div className={cx("head")}>
                  <h1>Tin nhắn</h1>
                  <p>
                    <SettingsBorderCircleIcon />
                  </p>
                </div>
                <ListUser />
              </div>
              <ChatBox />
            </div>
          </div>
        </MessageProvider>
      </Provider>
    </LayoutWithHeader>
  );
}

export default Mess;
