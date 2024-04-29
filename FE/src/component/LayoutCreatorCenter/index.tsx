import Button from "@/component/Button/page";
import {
  HomeOutlineIcon,
  IconLinesHorizontalDecreaseAlt,
  LineChartIcon,
  LogoTikTok,
  LogoutFillIcon,
  MessageOutlineIcons,
  PersonsOutlineIcon,
  QuestionsMessageIcon,
  UploadFileIcon,
} from "../../../public/icons/icons";
import { ConfigProvider, Menu, MenuProps, Popover } from "antd";
import style from "./LayoutCreatorCenter.module.scss";
import classNames from "classnames/bind";
import { AuthContextProvder } from "@/context/AuthContext/page";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Provider } from "react-redux";
import storeGlobal from "@/redux/StoreGlobal";
const cx = classNames.bind(style);
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    <p className={cx("text-menu")}>Trang chủ</p>,
    "home",
    <HomeOutlineIcon width={"24px"} height={"24px"} />
  ),
  getItem(
    <p className={cx("text-menu")}>Bài đăng</p>,
    "post",
    <IconLinesHorizontalDecreaseAlt width={"24px"} height={"24px"} />
  ),
  getItem(
    <p className={cx("text-menu")}>Bình luận</p>,
    "coment",
    <MessageOutlineIcons width={"24px"} height={"24px"} />
  ),
  getItem(
    <p className={cx("text-menu")}>Phân tích</p>,
    "analysis",
    <LineChartIcon width={"24px"} height={"24px"} />,
    [
      getItem(<p className={cx("text-menu")}>Số liệu chính</p>, "maindata"),
      getItem(<p className={cx("text-menu")}>Nội dung</p>, "content"),
    ]
  ),
  getItem(
    <p className={cx("text-menu")}>Phản hồi</p>,
    "feedback",
    <QuestionsMessageIcon width={"24px"} height={"24px"} />
  ),
];

function LayoutCreatorCenter({ children }: any) {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    async function getUser() {
      let user_local = localStorage.getItem("user");
      if (user_local) {
        setUser(JSON.parse(user_local));
        return;
      }
      setUser({ img: "sss" });
    }
    getUser();
  }, []);
  return (
    <Provider store={storeGlobal}>
      <AuthContextProvder>
        <div className={cx("wrapper")}>
          <div className={cx("header")}>
            <div className={cx("left")}>
              <LogoTikTok />
              <p className={cx("tux-text1")}>
                <span>Creator Center</span>
              </p>
              <span className={cx("tux-text")}>Beta</span>
            </div>
            <div className={cx("right")}>
              <Popover
                trigger={"click"}
                content={
                  <div>
                    <div>
                      <Button
                        iconLeft={<PersonsOutlineIcon />}
                        text={"Hồ sơ"}
                        noBorder
                        iconRight={<UploadFileIcon />}
                      />
                    </div>
                    <div>
                      <Button
                        text={"Đăng xuất"}
                        noBorder
                        iconLeft={<LogoutFillIcon />}
                      />
                    </div>
                  </div>
                }
              >
                <img src={user.picture ? user.picture : ""} alt="" />
              </Popover>
            </div>
          </div>
          <div className={cx("body")}>
            <div className={cx("sidebar-container")}>
              {/* ---------------- */}
              <div>
                <Button text={"Tải lên"} primary large />

                <div className={cx("menu")}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Menu: {
                          itemSelectedColor: "#FE2C55",
                          itemSelectedBg: "#FFF2F5",
                        },
                      },
                    }}
                  >
                    <Menu mode="inline" items={items} />
                  </ConfigProvider>
                </div>
              </div>
              {/* -------------------- */}
              <div className={cx("footer")}>
                <Link href={"/"}>
                  <p>Quay lại tiktok</p>
                </Link>
                <a>Điều khoản Dịch vụ</a>
                <a>Chính sách quyền riêng tư</a>
                <p>Bản quyền 2024 tiktok</p>
              </div>
              {/* -------------- */}
            </div>
            <div className={cx("page-container")}>{children}</div>
          </div>
        </div>
      </AuthContextProvder>
    </Provider>
  );
}

export default LayoutCreatorCenter;
