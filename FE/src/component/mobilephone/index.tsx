import { mobileImage } from "@/utils/string";
import style from "./MobiPhone.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import "../styling/input.css";
import { Segmented } from "antd";
import { memo, useContext, useState } from "react";
import Video from "./Video";
import AnhBia from "./AnhBia";
import { UploadContex } from "@/app/creator-center/upload/uploadContext";
function MobiPhone() {
  const [viewVD, setViewVD] = useState(true);
  
  return (
    <>
      <Segmented
        options={["Video", "Ảnh bìa"]}
        onChange={(value) => {
          if(value === "Video"){
            setViewVD(true);
            return;
          } 
          setViewVD(false);
        }}
      />
      <div className={cx("wrapper")}>
        <img src={mobileImage} alt="" className={cx("anh-dienthoai")} />
        {
          viewVD ? (
            <Video  />

          ):(
            <AnhBia />
          )
        }
      </div>
    </>
  );
}

export default memo(MobiPhone);
