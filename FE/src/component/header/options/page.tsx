import Tippy from "@tippyjs/react/headless";
import { useSpring, motion } from "framer-motion";
import styles from "./Options.module.scss";
import Button from "@/component/Button/page";
import { LogoutIcon, PlaneIcon } from "../../../../public/icons/icons";
import { useContext } from "react";
import useAuth from '@/hooks/useAuth';

function OptionsTippy({ children, data }: any) {
  const { user } = useAuth();
  return (
    <Tippy
      delay={[0, 200]}
      interactive
      placement="bottom"
      render={(attrs) => (
        <div className={styles["wrapper"]}>
          {data?.map((ite: any, i: Number) => {
            let href = '';
            if(ite.href){
              href += ite.href;
            }
            if(ite.id){
              href += "/"+user?.sub;
            }
            return (
              <Button key={i} text={ite.text} iconLeft={ite.icons} noBorder to={href} />
            );
          })}
          <div className={styles["btn-logout"]}>
            <Button
              text={"Đăng xuất"}
              iconLeft={<LogoutIcon />}
              noBorder
              full
              href={"http://localhost:5432/auth/google/logout"}
            />
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default OptionsTippy;
