import style from "./SideBar.module.scss";
import {
  CameraIcon,
  CompassIcon,
  FollowOutlineIcon,
  HomeOutlineIcon,
  PersonsOutlineIcon,
  UserIcon,
} from "../../../public/icons/icons";
import ItemMenu from "./ItemMenu/page";
import Button from "../Button/page";
import { Popover } from "antd";
const link_One = [
  {
    text: "Giới thiệu",
    to: "https://www.tiktok.com/about?lang=vi-VN",
  },
  {
    text: "Bảng tin",
    to: "https://newsroom.tiktok.com/",
  },
  {
    text: "Liên hệ",
    to: "https://www.tiktok.com/about/contact?lang=vi-VN",
  },
  {
    text: "Sự nghiệp",
    to: "https://careers.tiktok.com/",
  },
];
const link_Two = [
  {
    text: "TikTok for Good",
    to: "https://www.tiktok.com/forgood",
  },
  {
    text: "Quảng cáo",
    to: "https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&refer=tiktok_web",
  },
  {
    text: "TikTok LIVE Creator Networks",
    to: "https://www.tiktok.com/live/creator-networks/vi-VN?enter_from=tiktok_official",
  },
  {
    text: "Developers",
    to: "https://developers.tiktok.com/?refer=tiktok_web",
  },
  {
    text: "Minh bạch",
    to: "https://www.tiktok.com/transparency",
  },
  {
    text: "TikTok Rewards",
    to: "https://www.tiktok.com/tiktok-rewards/vi-VN",
  },
  {
    text: "TikTok Embeds",
    to: "https://www.tiktok.com/embed",
  },
];
const link_Three = [
  {
    text: "Trợ giúp",
    to: "https://support.tiktok.com/vi-VN",
  },
  {
    text: "An toàn",
    to: "https://support.tiktok.com/vi-VN",
  },
  {
    text: "Điều khoản",
    to: "https://support.tiktok.com/vi-VN",
  },
  {
    text: "Chính sách Quyền riêng tư",
    to: "https://support.tiktok.com/vi-VN",
  },
  {
    text: "Trung tâm quyền riêng tư",
    to: "https://support.tiktok.com/vi-VN",
  },
  {
    text: "Cổng thông tin Tác giả",
    to: "https://support.tiktok.com/vi-VN",
  },
  {
    text: "Hướng dẫn Cộng đồng",
    to: "https://support.tiktok.com/vi-VN",
  },
];
const itemConfig = [
  {
    text: "Dành cho bạn",
    icons: <HomeOutlineIcon />,
    href: '/'
  },
  {
    text: "Đang Follow",
    icons: <FollowOutlineIcon />,
  },
  {
    text: "Bạn bè",
    icons: <PersonsOutlineIcon />,
  },
  {
    text: "Khám phá",
    icons: <CompassIcon />,
  },
  {
    text: "LIVE",
    icons: <CameraIcon />,
  },
  {
    text: "Hồ sơ",
    icons: <UserIcon />,
  },
];
function SideBar() {
  return (
    <>
      <div className={style["wrapper"]}>
        <div className={style["list--menu__actions"]}>
          {itemConfig &&
            itemConfig.map((ite, i) => {
              return <ItemMenu key={i} ite={ite} />;
            })}
        </div>
        <div className={style["info"]}>
          <p>Các tài khoản đang follow</p>
          <p>Những tài khoản bạn follow sẽ xuất hiện tại đây</p>
        </div>
        <div className={style["link-actions"]}>
          <div className={style["img-info"]}>
            <img
              src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png"
              alt="tiktok"
            />
            <div className={style["text-img__info"]}>
              <p>Tạo hiệu ứng TikTok, nhận phần thưởng</p>
            </div>
          </div>
          <div className={style["btn-login"]}>
            <Button text={"Đăng nhập"} large outline />
          </div>
          <div className={style["link-box"]} style={{ paddingTop: "20px" }}>
            {link_One &&
              link_One.map((ite, i) => (
                <a target="_blank" href={ite.to} key={i}>
                  {ite.text}
                </a>
              ))}
          </div>
          <div className={style["link-box"]}>
            {link_One &&
              link_Two.map((ite, i) => (
                <a target="_blank" href={ite.to} key={i}>
                  {ite.text}
                </a>
              ))}
          </div>
          <div className={style["link-box"]}>
            {link_One &&
              link_Three.map((ite, i) => (
                <a target="_blank" href={ite.to} key={i}>
                  {ite.text}
                </a>
              ))}
          </div>
          <div className={style["link-box"]}>
            <Popover
              content={
                <a target="_blank" href="https://www.tiktok.com/legal/law-enforcement?lang=vi-VN"  >
                  <p className={style['popup-rule']}>NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK</p>
                </a>
              }
            >
              <span>Thêm</span>
            </Popover>
          </div>
          <div className={style["link-box"]}>
            <span>© 2024 TikTok</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
