import Link from "next/link";
import style from "./ItemMenu.module.scss";

function ItemMenu({ ite }: any) {
  const WrapperComponent : any = ite.href ? Link : 'div';
  const props = ite.href ? { href: ite.href } : {};
  
  return (
    <WrapperComponent {...props} className={style.wrapper}>
      <div className={style.icon}>{ite.icons}</div>
      <p className={style.text}>{ite.text}</p>
    </WrapperComponent>
  );
}

export default ItemMenu;
