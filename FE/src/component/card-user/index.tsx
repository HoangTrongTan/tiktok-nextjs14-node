import { TUser } from "@/context/type";
import { Flex } from "antd";
import Image from "next/image";
import Link from "next/link";
import OptionsButton from "../OptionsButton/page";
import { EllipsisHorizontalIcon } from "../../../public/icons/icons";
import styles from "./CardUser.module.scss";
import classNames from "classnames/bind";
import { TData } from "@/hooks/useDebounce";
type TProps = {
  user: TData;
  isOptions: boolean | false;
};
const cx = classNames.bind(styles);
function CardUser(props: TProps) {
  return (
    <Link href={`/profile/${props.user.sub}`}>
      <Flex className={cx("wrapper")} align="center" gap={10}>
        <img
          src={props.user.image}
          width={40}
          height={40}
          alt="image user error"
        />
        <Flex vertical={true}>
          <p>{props.user.email}</p>
          <p>{props.user.username}</p>
        </Flex>
        <OptionsButton onlyReport={true}>
          <div className={cx("options-btn")}>
            <EllipsisHorizontalIcon />
          </div>
        </OptionsButton>
      </Flex>
    </Link>
  );
}

export default CardUser;
