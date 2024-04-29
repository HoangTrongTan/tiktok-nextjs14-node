import { Provider } from "react-redux";
import { AuthContextProvder } from "@/context/AuthContext/page";
import Header from "../header/page";
import styles from "./LayoutWithSidebar.module.scss";
import storeGlobal  from "@/redux/StoreGlobal";
function LayoutWithHeader({ children }: any) {
  return (
    <Provider store={storeGlobal}>
      <AuthContextProvder>
        <Header />
        <div className={styles["wrapper"]}>
          <div className={styles["body"]}>{children}</div>
        </div>
      </AuthContextProvder>
    </Provider>
  );
}

export default LayoutWithHeader;
