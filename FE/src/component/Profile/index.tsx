"use client";
import LayoutWithSidebar from "../LayoutWithSidebar/page";
import style from "./Profile.module.scss";
import classNames from "classnames/bind";
import CardUser from "./CardUser";
import Actions from "./actions";
import TabProfile from "./tabs";
import { Provider } from "react-redux";

import { ProfileProvider } from "./ProfileContext";
const cx = classNames.bind(style);
function Profile({ props }: any) {
  console.log("PROPSSDSS:..", props);

  return (
    <LayoutWithSidebar>
      <ProfileProvider idUser={props.params.id}>
        <div className={cx("wrapper")}>
          <CardUser />
          {/* ---------------------------- */}
          <Actions />
          <p className={cx("tieu-su")}>Chưa có tiểu sử.</p>
          <div className={cx("tabs")}>
            <TabProfile />
          </div>
        </div>
      </ProfileProvider>
    </LayoutWithSidebar>
  );
}

export default Profile;
