import { Popover } from "antd";
import classNames from "classnames/bind";
import style from "../Mess.module.scss";

const cx = classNames.bind(style);
function OptionsMessage({ liked, children, del, handleClickDisLike , handleLike, handleDelete,handleReport }: any) {
  const Content = () => {
    return (
      <div className={cx('menu-wrapper')}>
        {liked ? (
          <div className={cx("menu-item")} onClick={handleClickDisLike} >Bỏ thích</div>
        ) : (
          <div className={cx("menu-item")} onClick={handleLike} >Thích</div>
        )}
        {
            del && (
                <div className={cx("menu-item")} onClick={handleDelete} >Xóa</div>
            )
        }
        <div className={cx("menu-item")} onClick={handleReport} >Báo cáo</div>
      </div>
    );
  };
  return (
    <Popover content={<Content />} trigger="hover" color={"#616161"} placement={"top"}>
      {children}
    </Popover>
  );
}

export default OptionsMessage;
