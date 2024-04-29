import { ConfigProvider, Tabs } from "antd";
import VideoList from "./VideoList";
import { LookUpIcon } from "../../../public/icons/icons";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import LikeVideoList from "./LikeVideoList";
import FavouritesVideoList from "./FavouritesVideoList";
import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import useAuth from "@/hooks/useAuth";

const cx = classNames.bind(style);
function TabProfile() {
  const { data }: any = useContext(ProfileContext);
  const { user } = useAuth();
  // Khai báo một mảng chứa các tab cơ bản
  const basicTabs = [
    {
      label: <p>Video</p>,
      key: "video",
      children: <VideoList />,
    },
    {
      label: (
        <p className={cx("flex-tabs")}>
          <LookUpIcon width={"1.3em"} height={"1.3em"} /> Yêu thích
        </p>
      ),
      key: "favourites",
      children: <LikeVideoList />,
    },
  ];

  // Nếu data và user bằng nhau, thêm tab "Đã thích" vào mảng
  if (data.sub === user?.sub) {
    basicTabs.push({
      label: (
        <p className={cx("flex-tabs")}>
          <LookUpIcon width={"1.3em"} height={"1.3em"} /> Đã thích
        </p>
      ),
      key: "liked",
      children: <FavouritesVideoList />,
    });
  }
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: "#f20894",
              itemSelectedColor: "#000",
              itemHoverColor: "#000",
              // horizontalItemPaddingLG: '0 20px'
            },
          },
        }}
      >
        <Tabs items={basicTabs.length ? [...basicTabs] : []} />
      </ConfigProvider>
    </>
  );
}

export default TabProfile;
