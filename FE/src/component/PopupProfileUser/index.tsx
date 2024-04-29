import Tippy from "@tippyjs/react/headless";
import style from "./PopupProfileUser.module.scss";
import classNames from "classnames/bind";
import Button from "../Button/page";
const cx = classNames.bind(style);
function PopupProfileUser({ children, data }: any) {
  return (
    <Tippy
      interactive
      delay={[800, 0]}
      placement="bottom-start"
      render={(attrs) => {
        return (
          <div className={cx("wrapper")}>
            <div className={cx('header-container')}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJtR9_BgQmpQuXmZvzT6zceHsBCWfyoKQk-g&usqp=CAU" alt="" />
              <Button text={"Follow"} outline />
            </div>
            <p>nhung9x.70</p>
            <p>Vườn thú bất ổn</p>
            <div className={cx('user-start-follow-like')}>
                <span>4435</span>
                <span>Follower</span>
                <span>36K</span>
                <span>Thích</span>
            </div>
            <p className={cx('user-card-user-bio')}>🥰Tt 3 video đầu nha🥰 70-Tây Ninh</p>
          </div>
        );
      }}
    >
      {children}
    </Tippy>
  );
}

export default PopupProfileUser;
