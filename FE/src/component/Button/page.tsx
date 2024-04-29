import Link from "next/link";
import style from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function Button({
  iconLeft,
  iconRight,
  text,
  large,
  to,
  href,
  outline,
  disable,
  primary,
  onClick,
  classes,
  small,
  rounded,
  noBorder,
  full,
  ...passProps
}: any) {
  let Comp: any = "div";
  const props = {
    onClick,
    ...passProps,
  };
  if (to) {
    Comp = Link;
    props.href = to;
  }
  if (href) {
    Comp = "a";
    props.href = href;
  }
  const classNames: any = cx({
    [classes]: classes,
    large: large,
    outline: outline,
    disable: disable,
    primary: primary,
    small: small,
    rounded: rounded,
    noBorder: noBorder,
    full: full,
    default: true,
  });

  return (
    <Comp {...props} className={classNames}>
      <div className={(iconLeft || iconRight) && style["wrapper"]}>
        <div className={style["icons"]}>{iconLeft || ""}</div>
        <div className={style["text"]}>{text}</div>
        <div className={style["icons"]}>{iconRight || ""}</div>
      </div>
    </Comp>
  );
}

export default Button;
