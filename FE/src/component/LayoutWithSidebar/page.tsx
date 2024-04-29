import { Provider } from "react-redux";
import { AuthContextProvder } from "@/context/AuthContext/page";
import Header from "../header/page";
import SideBar from "../sidebar/page";
import styles from "./LayoutWithSidebar.module.scss";
import storeGlobal from "@/redux/StoreGlobal";
function LayoutWithSidebar({ children }: any) {
  return (
    <Provider store={storeGlobal}>
      <AuthContextProvder>
        <Header />
        <div className={styles["wrapper"]}>
          <div className={styles["sidebar"]}>
            <SideBar />
          </div>
          <div className={styles["body"]}>{children}</div>
        </div>
      </AuthContextProvder>
    </Provider>
  );
}

export default LayoutWithSidebar;
