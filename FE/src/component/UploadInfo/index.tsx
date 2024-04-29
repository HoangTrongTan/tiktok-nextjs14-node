import style from "./UploadInfo.module.scss";
import classNames from "classnames/bind";
import BoxInput from "./boxinput";
import { InfoIcons, PictureIcon } from "../../../public/icons/icons";
import { Checkbox, Segmented, Select, Switch } from "antd";
import Button from "../Button/page";
import MobiPhone from "../mobilephone";
import { useCallback, useContext, useState } from "react";
import { UploadContex } from "@/app/creator-center/upload/uploadContext";
import OptionsUpload from "./Options";
import useAuth from "@/hooks/useAuth";
const cx = classNames.bind(style);
function UploadInfo() {
  const { handleUpload , curentFile , isFormOptions,setIsFormOptions } : any = useContext(UploadContex);
  const { user } = useAuth();
  const [inputValue,setInputValue] = useState("");
  console.log("Input value:...", inputValue);
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("box-fix_info")}>
        <div className={cx("text-margin")}>
          <h3 className={cx("text-font-bold")}>Tải video lên</h3>
          <p className={cx("text-blur")}>Đăng video vào tài khoản của bạn</p>
        </div>
        <div className={cx("body")}>
          <div className={cx("left")}>
            <p className={cx("chuthich-kitu")}>
              <span className={cx("text-font-bold")}>Chú thích</span>
              <span className={cx("text-blur")}>8 / 2200</span>
            </p>
            <BoxInput input={[inputValue,setInputValue]} />
            <p className={cx("flex")} style={{marginTop:20}}>
              <span className={cx("text-font-bold")} >Ảnh bìa</span>
              <span className={cx("text-blur-no-margin")}>
                <InfoIcons />
              </span>
            </p>
            <div className={cx("fix-cover-image")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC1C3M31vZ7mEzK_E15PNIsbpP_3Kftb952w&usqp=CAU"
                alt=""
              />
              <div className={cx("child-fix-img")}>
                <span>
                  <PictureIcon />
                </span>
                <span className={cx("text-font-bold")}>Sửa ảnh bìa</span>
              </div>
            </div>
            <div className={cx("text-margin")}>
              <p
                className={cx("text-font-bold")}
                style={{ color: "#000", marginBottom: 10 }}
              >
                Ai có thể xem video này
              </p>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </div>
            <div className={cx("text-margin")}>
              <p
                className={cx("text-font-bold")}
                style={{ color: "#000", marginBottom: 10 }}
              >
                Cho phép người dùng:
              </p>
              <div className={cx("cbx")}>
                <Checkbox>
                  <p className={cx("text-font-bold")}>Bình luận</p>
                </Checkbox>
                <Checkbox>
                  <p className={cx("text-font-bold")}>Duet</p>
                </Checkbox>
                <Checkbox>
                  <p className={cx("text-font-bold")}>Ghép nối</p>
                </Checkbox>
              </div>
              <p>
                Tính năng Duet/Tương tác và Ghép nối không khả dụng đối với
                video dài hơn 60 giây
              </p>
            </div>
            <div className={cx("calendar-for-video")} >
              <span className={cx("text-font-bold")}>Lên lịch cho video </span>
              <span >
                <InfoIcons />
              </span>
              <Switch defaultChecked />
            </div>
            <div className={cx("text-margin")}>
              <div className={cx("khai-bao-noi-dung")}>
                <span className={cx("text-font-bold")}>Khai báo nội dung bài đăng</span>
                <Switch defaultChecked />
              </div>
              <p className={cx("text-blur")}>
                Cho người khác biết bài đăng này quảng bá thương hiệu, sản phẩm
                hay dịch vụ.
              </p>
            </div>

            <div className={cx("text-margin")} >
              <div className={cx("chay-quy-trinh-kiem-tra")}>
                <span className={cx("text-font-bold")}>Chạy quy trình kiểm tra bản quyền</span>
                <Switch defaultChecked />
              </div>
              <p className={cx("text-blur")}>
                Chúng tôi sẽ kiểm tra xem video của bạn có sử dụng âm thanh vi
                phạm bản quyền hay không. Nếu chúng tôi phát hiện có vi phạm, bạn
                có thể chỉnh sửa video trước khi đăng.
                <span className={cx("tim-hieu-them")}>Tìm hiểu thêm</span>
              </p>
            </div>
            <div className={cx("btn-huy-dang")}>
              <Button text={"Hủy bỏ"} />
              <Button text={"Đăng"} primary onClick={() =>  handleUpload(curentFile,user?.sub, inputValue , user?.name )} />
            </div>
          </div>
          <div className={cx("right")}>
            
            <MobiPhone  />
            <OptionsUpload open={isFormOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadInfo;
