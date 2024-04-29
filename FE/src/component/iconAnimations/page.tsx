import style from "./IconAnimaton.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function MusicAnim() {
  return (
    <div className={cx('loader')}>
      <span className={cx('bar')}></span>
      <span className={cx('bar')}></span>
      <span className={cx('bar')}></span>
    </div>
  );
}

export { MusicAnim };
