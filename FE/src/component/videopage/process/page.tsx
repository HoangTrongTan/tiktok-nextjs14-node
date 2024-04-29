import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { VideoPageContext } from "../VideoPageContext";
import style from "../large/VideoLarge.module.scss";
import "../../styling/input.css";
import {
  ArrowScrollIcon,
  AudioIcon,
  AudioOffIcon,
} from "../../../../public/icons/icons";

function ProcessAndAudio() {
  const { CurrentVideo, videRef, handleTotalTime, setIsPlaying }: any =
    useContext(VideoPageContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [inputValue, setInputValue] = useState(70);
  const [audioOff, setAudioOff] = useState<boolean>(false);
  const audioValueOld = useRef<Number>(inputValue);

  const handleChangeVolumn = useCallback((volumn: any) => {
    if (videRef?.current) {
      // setAudioOff(false);
      if (Number(volumn) === 10) {
        setAudioOff(true);
        if (videRef?.current) {
          videRef.current.volume = 0;
        }
      } else {
        setAudioOff(false);
        videRef.current.volume = volumn / 100;
      }
      setInputValue(Number(volumn));
    }
  }, []);
  const handleToggleAudio = () => {
    if (audioOff) {
      setAudioOff(false);
      videRef.current.volume = Number(audioValueOld.current) / 100;
      setInputValue(Number(audioValueOld.current));
      return;
    }
    audioValueOld.current = inputValue;
    videRef.current.volume = 0;
    setInputValue(0);
    setAudioOff(true);
    return;
  };
  const handleChangeVideo = (e:any) => {
    if (videRef?.current) {
      setCurrentTime(e.target.value);
      videRef.current.currentTime = e.target.value;
    }
  }
  useEffect(() => {
    if (videRef) {
      if (videRef?.current) {
        videRef?.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        videRef?.current.addEventListener("timeupdate", () => {
          setCurrentTime(Number(videRef?.current?.currentTime));
        });
      }
      return () => {
        videRef?.current?.removeEventListener("ended", () => {});
        videRef?.current?.removeEventListener("timeupdate", () => {});
      };
    }
    return () => {};
  }, [videRef]);
  return (
    <>
      <div className={style["process-time"]}>
        <div className="process" style={{ flex: 2 }}>
          <input
            type="range"
            className="level"
            min={0}
            value={currentTime}
            max={videRef.current?.duration}
            onChange={handleChangeVideo}
          />
        </div>
        <p>
          {handleTotalTime(currentTime)}/
          {handleTotalTime(videRef?.current?.duration)}
        </p>
      </div>
      <div className={style["scroll-audio"]}>
        <div className={`${style["btn-scroll"]} ${style["btn"]}`}>
          <ArrowScrollIcon />
        </div>
        <div className={`${style["btn-audio"]} ${style["btn"]}`}>
          <span onClick={handleToggleAudio}>{audioOff ? <AudioOffIcon /> : <AudioIcon />}</span>
          <input
            type="range"
            className={style["volumn"]}
            min={10}
            max={100}
            step={10}
            value={inputValue}
            // value={}
            onChange={(e) => {
              handleChangeVolumn(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default memo(ProcessAndAudio);
