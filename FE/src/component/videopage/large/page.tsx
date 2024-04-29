import style from "./VideoLarge.module.scss";
import {
  MultiplyIcon,
  EllipsisHorizontalIcon,
} from "../../../../public/icons/icons";
import OptionsButton from "@/component/OptionsButton/page";
import "../../styling/input.css";
import VideoPlayer from "../videoPlayer/page";
import ProcessAndAudio from "../process/page";
import PlayNextPrevrious from "../playNextPrevrious/page";
import SearchDetailVideo from "../search/page";
import ProfileCard from "@/component/profileCard/page";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Actions from "../actions/page";
import { useContext, useEffect, useState } from "react";
import { VideoPageContext } from "../VideoPageContext";
import { ConfigProvider, Tabs, message } from "antd";
import Comment from "../comments/page";
import CreatorVideos from "../creatorVideos/page";
import Link from "next/link";
import "./configAntd.css";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";

function VideoLarge({ props }: any) {
  const { user  } = useAuth();

  const { ShortenText, setIdVideoUser, heartCommentCount }: any =
    useContext(VideoPageContext);

  useEffect(() => {
    setIdVideoUser(props.params.id);
  }, []);
  console.log();

  return (
    <div className={style["wrapper"]}>
      {/* ---------------Bên xem video------------ */}
      <div className={style["video-watching"]}>
        <div className={style["header"]}>
          <div className={`${style["btn-exits"]}  ${style["btn"]}`}>
            <Link href={"/"}>
              <MultiplyIcon width={"20"} height={"20"} />
            </Link>
          </div>
          {/* -----Search---- */}
          <SearchDetailVideo />
          {/* -----end---- */}

          <OptionsButton black placement="bottomRight" offset={[0, 10]}>
            <div className={`${style["options-btn"]} ${style["btn"]}`}>
              <EllipsisHorizontalIcon />
            </div>
          </OptionsButton>
        </div>
        <div className={style["body"]}>
          <div className={style["none"]}></div>
          <PlayNextPrevrious />
        </div>
        <div className={style["footer"]}>
          <div className={style["none"]}></div>
          <ProcessAndAudio />
        </div>
        <VideoPlayer />
      </div>
      {/* ------------------end ----------------- */}
      {/* -----------------Bên chức năng khác----- */}
      <div className={style["actions-other"]}>
        <div className={style["info-own_video"]}>
          <ProfileCard />
        </div>
        <div className={style["box-actions_btn"]}>
          <Actions />
          <div className={style["copy-link"]}>
            <p>
              {ShortenText(
                "https://www.tiktok.com/@retrobrx/video/7331179597934906630?is_from_webapp=1&sender_device=pc&web_id=7339559482663486984"
              )}
            </p>
            <CopyToClipboard
              text={
                "https://www.tiktok.com/@retrobrx/video/7331179597934906630?is_from_webapp=1&sender_device=pc&web_id=7339559482663486984"
              }
              onCopy={(text: string, result: boolean) => {
                message.success("Đã sao chép", 2);
              }}
            >
              <p>Sao chép liên kết</p>
            </CopyToClipboard>
          </div>
        </div>
        <div className={style["comments-creator_video"]}>
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
            <Tabs
              items={[
                {
                  label: `Bình luận ${heartCommentCount.total_comment_quanlity}`,
                  key: "comments",
                  children: <Comment />,
                },
                {
                  label: "Video cuả nhà sáng tạo",
                  key: "creatorvideos",
                  children: <CreatorVideos />,
                },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>
      {/* ------------------end ----------------- */}
    </div>
  );
}

export default VideoLarge;
