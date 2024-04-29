"use client";
import styles from "./header.module.scss";
import {
  LogoTikTok,
  EllipsIcon,
  PlusIcon,
  PlaneIcon,
  LettersIcon,
} from "../../../public/icons/icons";
import InputSearch from "../input/page";
import Button from "../Button/page";
import OptionsTippy from "./options/page";
import { config } from "./OptionsConfig";
import Link from "next/link";
import { useContext } from "react";
import OptionsNotificationHeader from "./optionsNotifi";
import useAuth from "@/hooks/useAuth";

function Header() {
  const { user, setOpenLogin } = useAuth();
  
  return (
    <div className={styles.wrapper}>
      {/* ----------LOGO TIKTOK---------------- */}
      <div className={styles.logo}>
        <Link href={"/"}>
          <LogoTikTok />
        </Link>
      </div>
      {/* ----------End Logo------------------ */}

      {/* -----------Search input------------ */}
      <InputSearch />
      {/* ----------End search input ------------ */}

      {/* ----------Actions --------------------- */}
      <div className={styles["action-wrapper"]}>
        {user ? (
          <>
            <Link href={"/creator-center/upload"}>
              <Button text={"Upload"} iconLeft={<PlusIcon />} />
            </Link>
            <Link href={"/messages"}>
              <div>
                <PlaneIcon />
              </div>
            </Link>
            <OptionsNotificationHeader>
              <div className={styles["icons"]}>
                <LettersIcon />
              </div>
            </OptionsNotificationHeader>
          </>
        ) : (
          <>
            <Button text={"Upload"} iconLeft={<PlusIcon />} />
            <Button text={"Log in"} onClick={() => setOpenLogin(true)} />
          </>
        )}
        {/* 106970877592714393062 */}
        <OptionsTippy data={config}>
          <div>
            {user ? (
              <div>
                <img src={user?.picture} alt="image" />
              </div>
            ) : (
              <EllipsIcon />
            )}
          </div>
        </OptionsTippy>
      </div>
      {/* -------------End Actions------------------ */}
    </div>
  );
}

export default Header;
