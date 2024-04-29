import { useCallback, useContext } from "react";
import { MusicIcon } from "../../../public/icons/icons";
import Button from "../Button/page";
import PopupProfileUser from "../PopupProfileUser";
import style from "./profileCard.module.scss";
import { VideoPageContext } from "../videopage/VideoPageContext";

function ProfileCard({ data }: any) {
  const { CurrentUser, CurrentVideo }: any = useContext(VideoPageContext);
  const ParseDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }, []);
  return (
    <>
      <div className={style["wrapper"]}>
        <div className={style["info"]}>
          <PopupProfileUser>
            <img src={CurrentUser.image ?? ""} alt="" />
          </PopupProfileUser>
          <div className={style["text-info"]}>
            <p>
              <span>{CurrentUser.username}</span>
            </p>
            <p>
              {CurrentUser.nickName}{" "}
              <span>.{ParseDate(CurrentVideo.createdAt)}</span> <span></span>
            </p>
          </div>
          <Button text={"Follow"} primary />
        </div>
        <div className={style["description"]}>
          <span>{CurrentVideo.ghiChu}</span>
          {CurrentVideo.tags && (
            <>
              <span className={style["tags"]}>#nhuthuynh77 #ancungtiktok</span>
              <span className={style["tags"]}>#nhuthuynh77 #ancungtiktok</span>
            </>
          )}
        </div>
        <div className={style["music"]}>
          <p>
            <MusicIcon />
            nhạc nền - Review Cảm Lạnh
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
