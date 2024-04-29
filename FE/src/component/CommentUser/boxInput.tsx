"use client"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { EmojiSmallIcon, MultiplyIcon } from "../../../public/icons/icons";
import style from "./CommentUser.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { Popover, message, notification } from "antd";
import { VideoPageContext } from "../videopage/VideoPageContext";
import useAuth from "@/hooks/useAuth";
const cx = classNames.bind(style);
function BoxInput({ setShowBoxInput, small, clearClose, handleClick }: any) {
  const { getComment, CurrentVideo }: any = useContext(VideoPageContext);
  const { user } = useAuth();
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const ruleQuanlity = false;
  const handlePostComment = async () => {
    if (!text.trim()) {
      notification.info({
        message: "Để ý ",
        description: "Vui lòng không để trống !!",
      });
      return;
    }
    handleClick(CurrentVideo._id, user.sub, text);
    if (setShowBoxInput) {
      setShowBoxInput(false);
    }
    await getComment();
    setText("");
  };
  return (
    <div className={cx("box-answer", { clearClose: clearClose, small: small })}>
      {/* ---------------------------------- */}
      <div className={style["input-comment"]}>
        <TextareaAutosize
          spellCheck={false}
          className={style["input"]}
          maxRows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Popover
          trigger={"click"}
          placement={"topLeft"}
          content={
            <EmojiPicker
              onEmojiClick={(emojidata: EmojiClickData, e: MouseEvent) => {
                setText((props) => props + emojidata.emoji);
              }}
            />
          }
        >
          <div
            className={style["btn-tags"]}
            onClick={() => setIsEmojiPicker(!isEmojiPicker)}
          >
            <EmojiSmallIcon width={"20px"} height={"20px"} />
          </div>
        </Popover>
        <div
          className={style["btn-tags"]}
          style={{ right: "60px", bottom: "16.4px" }}
        >
          @
        </div>

        {ruleQuanlity && (
          <div className={style["check-character"]}>
            <p>34/150</p>
          </div>
        )}
      </div>
      {/* -----------------------handlePost(user.sub ,CurrentVideo._id , text  ,setText)----------- */}

      <p
        className={style["btn-post"]}
        onClick={() => {   
          handlePostComment();
        }}
      >
        Đăng
      </p>
      <div
        className={cx("btn-close_comment")}
        onClick={() => setShowBoxInput(false)}
      >
        <MultiplyIcon width={"15px"} height={"15px"} />
      </div>
    </div>
  );
}

export default BoxInput;
