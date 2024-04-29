import "./configAntd.css";
import { Popover } from "antd";
import React, { useState } from "react";
import classNames from "classnames/bind";
import Likes from "../ListComponentNotifications/Likes";
import Comments from "../ListComponentNotifications/Comment";
import styles from "./OptionsNotificationHeader.module.scss";
import Followes from "../ListComponentNotifications/Follower";
import AllActive from "../ListComponentNotifications/AllActive";
import FeedBackAndTags from "../ListComponentNotifications/feedBackAndTags";
import { GlobalNotifiProvider } from "../GlobalContextNotifi";

const cx = classNames.bind(styles);
const Config = [
  {
    title: "Tất cả hoạt động",
    component: AllActive,
  },
  {
    title: "Thích",
    component: Likes,
  },
  {
    title: "Bình luận",
    component: Comments,
  },
  {
    title: "Lượt nhắn đến và lượt gắn thẻ",
    component: FeedBackAndTags,
  },
  {
    title: "Follower",
    component: Followes,
  },
];
function OptionsNotificationHeader({ children }: any) {
  const [CurrentComponent, setCurrentComponent] = useState<any>(0);
  const Comp = Config[CurrentComponent].component;
  return (
    <GlobalNotifiProvider >
      <Popover
        content={() => (
          <div className={cx("wrapper")}>
            <h1>Thông báo</h1>
            <div className={cx("list-btn")}>
              {Config &&
                Config.map((ite: any, i: any) => (
                  <h3
                    className={cx({ active: CurrentComponent === i })}
                    key={i}
                    onClick={() => setCurrentComponent(i)}
                  >
                    {ite.title}
                  </h3>
                ))}
            </div>
            <div className={cx("list-data")}>
              <Comp />
            </div>
          </div>
        )}
        trigger="click"
        placement="bottom"
        color="#fff"
      >
        {children}
      </Popover>
    </GlobalNotifiProvider>
  );
}

export default OptionsNotificationHeader;
