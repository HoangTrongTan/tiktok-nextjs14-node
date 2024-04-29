import { useContext } from "react";
import { VideoPageContext } from "../VideoPageContext";
import style from "../large/VideoLarge.module.scss";
import "../../styling/input.css";
import InputSearch from "@/component/input/page";

function SearchDetailVideo() {
    return ( <div className={style["search"]}>
    <InputSearch noBackground={true} />
  </div> );
}

export default SearchDetailVideo;