import styles from "./VideoItem.module.scss";
import { MusicIcon, UserCheckIcon } from "../../../../public/icons/icons";
import Button from "@/component/Button/page";
import VideoCard from "../videoCard/page";
import VideoActions from "../videoActions/page";
import { memo, useContext, useEffect, useState } from "react";
import * as FollowReq from "../../../api-service/follow";
import useAuth from '@/hooks/useAuth';
import Link from "next/link";


function VideoItem({ data , getDataVideos }: any) {
  const { user } = useAuth();
  const [follow, setFollow] = useState<any>(null);
  const getFollow = async () => {
    const res = await FollowReq.show(user?.sub, data?.idChuSoHuu);
    setFollow(res);
  };
  useEffect(() => {
    getFollow();
  }, [data]);
  const handleFollow = async () => {
    await FollowReq.follow({  idUserMember:[user?.sub , data?.idChuSoHuu ] , idSender: user?.sub });
    getFollow();
  };

  const checkFollowing = () => {
    if (follow) {
      return (follow.idSender === user?.sub ) && !follow.isSuccess;
    }
  };
  const checkAccept = () => {
    if (follow) {
      return !(follow.idSender === user?.sub ) && !follow.isSuccess;
    }
  }
  const handleAccept = async () => {
    await FollowReq.accept({  idUserMember:[user?.sub , data?.idChuSoHuu ] });
    getFollow();
    getDataVideos();
  };
  const handleUnFriends = async () => {
    // await FollowReq.unFriends({  idUserMember:[user?.sub , data?.idChuSoHuu ] });
    // getFollow();
    // getDataVideos();
  }
  const renderButton = () => {

    if (follow) {
      if (follow.isSuccess) {
        return <Button text={"Bạn bè"} primary iconRight={<UserCheckIcon />} />;
      }
      if (checkFollowing()) {
        
        return <Button text={"Đang follow..."} onClick={handleUnFriends} />;
      }
      if(checkAccept()) {
        return <Button text={"Chấp nhận"} primary onClick={handleAccept} />;
      }
    } else {
      return <Button text={"Follow"} outline onClick={handleFollow} />;
    }
  };
  return (
    <div className={styles["wrapper"]}>
      <div>
        <Link href={`/profile/${data?.idChuSoHuu}`} ><img style={{ width: 56, height: 56 }} src={data?.user?.image} alt="" /></Link>
      </div>
      {/*  */}
      <div className={styles["card-content"]}>
        {/*  */}
        <div>
          {/*  */}
          <div style={{ padding: "5px 0" }}>
            <Link href={`/profile/${data?.idChuSoHuu}`} ><span className={styles["name"]}>{data?.user.username}</span></Link >
            <span className={styles["nick-name"]}>{data?.user.sub}</span>
          </div>
          {/*  */}
          {/*  */}
          <div>
            <span className={styles["captions"]}>{data?.ghiChu}</span>
            <span className={styles["tags"]}>{data?.tags}</span>
          </div>
          {/*  */}
          {/*  */}
          <div className={styles["music"]}>
            <MusicIcon />
            <span>{`original sound - ${data.music}`}</span>
          </div>
          {/*  */}
        </div>
        {/*  */}
        {/*  */}
        <div className={styles["wrapper-video"]}>
          <VideoCard data={data} />
          <VideoActions data={data} />
        </div>
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
      <div>{renderButton()}</div>
    </div>
  );
}

export default memo(VideoItem);
