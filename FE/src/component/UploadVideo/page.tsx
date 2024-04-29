import { UploadContex } from "@/app/creator-center/upload/uploadContext";
import { useCallback, useContext } from "react";
import style from "./UploadVideo.module.scss";
import classNames from "classnames/bind";
import FixVideo from "../UploadInfo/fixVideo/page";
import { Upload } from "antd";
import { CloudUploadIcons } from "../../../public/icons/icons";
import Button from "../Button/page";
import UploadInfo from "../UploadInfo";
const cx = classNames.bind(style);
const { Dragger } = Upload;

function UploadVideo() {
    const { curentFile, setCurentFile } :any = useContext(UploadContex);
    const handleChangeFile = useCallback((e: any) => {
        setCurentFile(e.file);
      }, [])
    return ( <>
    {curentFile && (
          <div className={cx("top")}>
            <FixVideo />
          </div>
        )}
        <div className={cx("wrapper")}>
          <div className={cx("wrapper-main")}>
            {!curentFile && (
              <Dragger
                onChange={handleChangeFile}
                maxCount={1}
                progress={{
                  strokeColor: {
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  },
                  strokeWidth: 3,
                  format: (percent) =>
                    percent && `${parseFloat(percent.toFixed(2))}%`,
                }}
              >
                <div className={cx("box-upload")}>
                  <div className={cx("icon-upload")}>
                    <CloudUploadIcons width={"48px"} height={"48px"} />
                  </div>
                  <p className={cx("text-main")}>Chọn video để tải lên</p>
                  <p className={cx("text-way-bottom")}>Hoặc kéo và thả tập tin</p>
                  <p>MP4 hoặc WebM</p>
                  <p>Độ phân giải 720x1280 trở lên</p>
                  <p>Tối đa 10 phút</p>
                  <p className={cx("text-way-bottom")}>Nhỏ hơn 10 GB</p>
                  <Button text={"Chọn tập tin"} large primary />
                </div>
              </Dragger>
            )}
            {curentFile && (
              <>
                <UploadInfo/>
              </>
            )}
          </div>
        </div>
    </> );
}

export default UploadVideo;