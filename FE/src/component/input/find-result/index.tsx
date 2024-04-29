import { Flex, Popover } from "antd";
import styles from "./FindResult.module.scss";
import { ReactNode } from "react";
import { TUser } from "@/context/type";
import CardUser from "@/component/card-user";
import { TData } from "@/hooks/useDebounce";

type Tprops = {
  children: ReactNode;
  users: TData[];
};
function FindResult(props: Tprops) {
  return (
    <Popover
      style={{ width: "100%", height: "100%" }}
      content={() => (
        <div style={{ width: "100%", height: "100%" }}>
          <Flex vertical gap={"middle"}>
            <p>Tài khoản</p>
            {props.users ? (
              props.users.map((item) => (
                <CardUser user={item} key={item.sub} isOptions />
              ))
            ) : (
              <p></p>
            )}
          </Flex>
        </div>
      )}
    >
      {props.children}
    </Popover>
  );
}

export default FindResult;
