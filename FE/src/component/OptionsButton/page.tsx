import { Popover } from "antd";
import { FlagIcon, HeartBrokenIcon, TrashCanIcon } from "../../../public/icons/icons";
import style from "./OptionsButton.module.scss";
import classNames from "classnames/bind";
import { ReactNode } from "react";
const cx = classNames.bind(style);
function OptionsButton({
  children,
  black,
  hoverPink,
  hoverBolder,
  placement = "rightTop",
  offset = [35, -15],
  onlyReport = false,
  onlyDelete = { type: false, callback: () => {} },
}: any) {
  return (
    <Popover
      content={content({
        black,
        hoverPink,
        hoverBolder,
        onlyReport,
        onlyDelete,
      })}
      placement={placement}
      trigger="hover"
      align={{ offset: offset }}
      color={black ? "#000" : ""}
    >
      {children}
    </Popover>
  );
}

export default OptionsButton;

const content = ({
  black,
  hoverPink,
  hoverBolder,
  onlyReport,
  onlyDelete,
}: any) => {
  const clasnames = cx({
    black: black,
    hoverPink: hoverPink,
    hoverBolder: hoverBolder,
  });
  // console.log("onlyDELET onlyDelete: ", onlyDelete);
  return (
    <div className={clasnames}>
      {!onlyReport && !onlyDelete.type && (
        <div className={style["popup-item"]}>
          <div className={style["icon-popup"]}>
            <HeartBrokenIcon />
          </div>
          <p>Không quan tâm</p>
        </div>
      )}

      {!onlyDelete.type && (
        <div className={style["popup-item"]}>
          <div className={style["icon-popup"]}>
            <FlagIcon />
          </div>
          <p>Báo cáo</p>
        </div>
      )}

      {onlyDelete.type && (
        <div className={style["popup-item"]} onClick={ () => onlyDelete.callback() }>
          <div className={style["icon-popup"]}>
            <TrashCanIcon />
          </div>
          <p>Xóa</p>
        </div>
      )}
    </div>
  );
};
