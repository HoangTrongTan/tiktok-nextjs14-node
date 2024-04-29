import { MagnifyingGlass, MultiplyIcon } from "../../../../public/icons/icons";
import style from "./BoxInput.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function BoxInput( { input } : any) {
  const [inputValue,setInputValue] = input;
  return (
    <div className={cx("wrapper")}>
      {/* <p>@Bạn bè</p> */}
      <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <span className={cx('suggest')}>@</span>
      <span className={cx('tags')}>#</span>
      <div className={cx('glass-close')}>
        <p className={cx('glass-css')}>
          <MagnifyingGlass width={"20px"} height={"20px"} />
        </p>
        <p className={cx('close-css')}>
          <MultiplyIcon width={"15px"} height={"15px"} />
        </p>
      </div>
    </div>
  );
}

export default BoxInput;
