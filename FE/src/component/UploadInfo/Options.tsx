import { Modal } from "antd";
import Button from "../Button/page";
import { useContext } from "react";
import { UploadContex } from "@/app/creator-center/upload/uploadContext";

function OptionsUpload({ open }: any) {
    const { setCurentFile , setIsFormOptions } : any = useContext(UploadContex);
  return (
    <>
      <Modal open={open} footer={""}>
        <p>Video của bạn đã được tải lên TikTok!</p>
        <Button
          text={"Tải video khác lên"}
          primary
          onClick={() => {
            setCurentFile(null);
            setIsFormOptions(false);
          }}
        />
        <Button
          text={"Quản lý bài đăng của bạn"}
          primary
          onClick={() => console.log("quản lý bài đăng")}
        />
      </Modal>
    </>
  );
}

export default OptionsUpload;
