import classNames from "classnames/bind";
import style from "../Mess.module.scss";
import {
  EmojiSmallIcon,
  PlaneFullBodyIcon,
} from "../../../../public/icons/icons";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useContext, useRef, useState } from "react";
import { Popover } from "antd";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MessageContext } from "../MessageContext";

const cx = classNames.bind(style);

function InputBox() {
  const [text, setText] = useState("");
  const { user , chat , handleSendText}:any = useContext(MessageContext);
  const [objMessage,setObjMessage] = useState<any>(null);
  const InputRef = useRef<HTMLTextAreaElement>(null);
  const handleSetText = (e: any) => {
    if(e.target.value.length > 6000) return;
    setText(e.target.value);
    setObjMessage( (prev:any) => ({
      ...prev,
      idSender: user?.sub,
      text: e.target.value,
      idFollow: chat?.curentChat?._id
    }) );
  };
  const checkLength80 = () => {
    return text.length > 80;
  }
  return (
    <div className={cx("box-input")}>
      <ReactTextareaAutosize
        ref={InputRef}
        spellCheck={false}
        className={cx("input", { paddBottom: checkLength80() })}
        maxRows={4}
        onChange={handleSetText}
        value={text}
      />
      <Popover
        trigger={"click"}
        placement={"topLeft"}
        content={
          <EmojiPicker
            onEmojiClick={(emojidata: EmojiClickData, e: MouseEvent) => {
              InputRef.current?.focus();
              setText((props) => props + emojidata.emoji );
              setObjMessage( (prev:any) => ({
                ...prev,
                idSender: user?.sub,
                text: prev.text + emojidata.emoji,
                idFollow: chat?.curentChat?._id
              }) );
            }}
          />
        }
      >
        <div className={cx("btn-icons" , { rightPos: text })}>
          <EmojiSmallIcon width={"25px"} height={"25px"} />
        </div>
      </Popover>
      {
        checkLength80() && (
            <span className={cx('text-length')}>{text.length}/6000</span>
        )
      }
      {text && (
        <div className={cx("btn-send")} onClick={() => handleSendText(objMessage,setText)}>
          <PlaneFullBodyIcon width={"30px"} height={"30px"} />
        </div>
      )}
    </div>
  );
}

export default InputBox;
