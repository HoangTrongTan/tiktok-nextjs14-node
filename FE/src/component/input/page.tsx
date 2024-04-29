import {
  MagnifyingGlass,
  CloseIcon,
  LoadingCycle,
} from "../../../public/icons/icons";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";
import FindResult from "./find-result";
import { useEffect, useState } from "react";
import useDebounce, { TData } from "@/hooks/useDebounce";
import * as UerReq from "@/api-service/user";
import useAuth from "@/hooks/useAuth";

const cx = classNames.bind(styles);
function InputSearch({ noBackground }: any) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<TData[]>([]);
  const [text, setText] = useState<string>("");
  const debounce: string = useDebounce(text, 1000);
  useEffect(() => {
    const fetchApi = async () => {
      if (debounce.trim()) {
        setLoading(true);
        const res = await UerReq.getUserByName(debounce, user?.name ?? "");

        setData(res);
        setLoading(false);
      }
    };
    fetchApi();
  }, [debounce]);
  const handleFind = (value: string) => {
    setText(value);
  };
  const handleDeleteText = (): void => {
    setText("");
  };
  return (
    <div
      className={`${styles["wrapper"]} ${noBackground ? styles["no-bg"] : ""} `}
    >
      <FindResult users={data}>
        <div className={styles["box-search"]}>
          <input
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => handleFind(e.target.value)}
            value={text}
          />
          {text && !loading && (
            <span onClick={handleDeleteText}>
              <CloseIcon className={styles["actions"]} />
            </span>
          )}
          {loading && <LoadingCycle className={cx("actions", "loading")} />}
        </div>
      </FindResult>
      <div className={styles["find-btn"]}>
        <MagnifyingGlass />
      </div>
    </div>
  );
}

export default InputSearch;
