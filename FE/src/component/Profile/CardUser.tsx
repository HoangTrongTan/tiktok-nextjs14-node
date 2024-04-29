import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import Button from "../Button/page";
import {
  EditIcon,
  EllipsisHorizontalIcon,
  ShareOutlineIcon,
  UserRandomIcon,
} from "../../../public/icons/icons";
import { Modal } from "antd";
import { ProfileContext } from "./ProfileContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import useAuth from "@/hooks/useAuth";

const cx = classNames.bind(style);
function CardUser() {
  const [open, setOpen] = useState<boolean>(false);
  const {
    data,
    getUser,
    follow,
    handleAccept,
    handleFollow,
    handleUnFriends,
  }: any = useContext(ProfileContext);
  const { user } = useAuth();
  const handleEditProfile = () => {
    setOpen(true);
  };
  const isOwn = () => {
    return data?.sub === user?.sub;
  };
  const renderFriends = () => {
    if (!follow)
      return <Button text={"Follow"} outline onClick={handleFollow} />;

    if (follow?.isSuccess) {
      return (
        <>
          <Button text={"Tin nhắn"} outline />
          <Tippy
            animation="scale"
            delay={[0, 200]}
            content="Bỏ follow"
            placement="bottom"
          >
            <div className={cx("btn-un-follow")} onClick={handleUnFriends}>
              <UserRandomIcon />
            </div>
          </Tippy>
        </>
      );
    }
    if (follow?.idSender === user?.sub) {
      return (
        <Button text={"Đang following.."} outline onClick={handleUnFriends} />
      );
    }
    return <Button text={"Chấp nhận"} outline onClick={handleAccept} />;
  };
  return (
    <>
      <>
        <div>
          <div className={cx("card-info")}>
            <img src={data?.image} alt="image" />
            <div className={cx("card-center")}>
              <p className={cx("user-name")}>
                {data?.tiktokId || data?.username}
              </p>
              <p className={cx("nickname")}>{data?.username}</p>
              {isOwn() ? (
                <div>
                  <Button
                    text={"Sửa hồ sơ"}
                    iconLeft={<EditIcon />}
                    onClick={handleEditProfile}
                    classes={cx("btn-card")}
                  />
                </div>
              ) : (
                <div className={cx("btn-not-own")}>{renderFriends()}</div>
              )}
            </div>
            <div className={cx("btn-share-ellipse")}>
              <div>
                <ShareOutlineIcon />
              </div>
              <div>
                <EllipsisHorizontalIcon />
              </div>
            </div>
          </div>
        </div>
        <Modal footer={""} open={open} onCancel={() => setOpen(false)}>
          <div>Modal</div>
        </Modal>
      </>
    </>
  );
}

export default CardUser;
