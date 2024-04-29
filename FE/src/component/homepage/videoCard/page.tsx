"use client";
import styles from "./VideoCard.module.scss";
import OptionsButton from "../../OptionsButton/page";
import {
  ArrowScrollIcon,
  AudioIcon,
  AudioOffIcon,
  EllipsisHorizontalIcon,
  PauseButtonIcon,
  PlayButtonIcon,
} from "../../../../public/icons/icons";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ContextVideo } from "../VideoContext";
import '../../styling/input.css';
import { redirect } from "next/navigation";
import Link from "next/link";
function VideoCard({ data }: any) {
  const {
    handlePlay,
    currentVideo,
    handleTotalTime,
    handleChangeVolumn,
    handleToggleAudio,
    hiandleChangeTimeVideo,
  } = useContext(ContextVideo);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRenderSuccess, setIsRenderSucess] = useState(false);
  const [audioOff, setAudioOff] = useState(false);
  const [inputValue, setInputValue] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioValueOld = useRef<Number>(inputValue);
  useEffect(() => {
    if (currentVideo === data._id) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [currentVideo, isRenderSuccess]);

  useEffect(() => {
    setIsRenderSucess(true);
    localStorage.setItem("history-video", "true");
    return () => {
      localStorage.removeItem("history-video");
    };
  }, []);

  // console.log("Time update..", videoRef?.current?.currentTime);
  useEffect(() => {
    if (videoRef?.current) {
      videoRef?.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
      videoRef?.current.addEventListener("timeupdate", () => {
        setCurrentTime(Number(videoRef?.current?.currentTime));
      });
    }
    return () => {
      videoRef?.current?.removeEventListener("ended", () => {});
      videoRef?.current?.removeEventListener("timeupdate", () => {});
    };
  }, [isRenderSuccess]);

  const handleCheckAudio = useCallback((volume: String) => {
    console.log("Volumn");

    if (Number(volume) === 10) {
      setAudioOff(true);
      if (videoRef?.current) {
        videoRef.current.volume = 0;
      }
    } else {
      setAudioOff(false);
    }
    setInputValue(Number(volume));
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <Link href={`/video/${data._id}/${data.user.sub}`}><div style={{background:"#000", borderRadius: '10px'}}><video src={`http://localhost:5432/videos/${data.path}`} ref={videoRef} ></video></div></Link>
      <OptionsButton>
        <div className={styles["options-btn"]}>
          <EllipsisHorizontalIcon />
        </div>
      </OptionsButton>
      <div className={styles["actions-btn"]}>
        {/* --------------------actions button----------------------- */}
        <div className={styles["actions"]}>
          <div
            className={styles["btn"]}
            onClick={() => handlePlay(videoRef, data._id, setIsPlaying, isPlaying)}
          >
            {isPlaying ? <PauseButtonIcon /> : <PlayButtonIcon />}
          </div>
          <div className={styles["audio-scroll-btn"]}>
            <div className={styles["btn"]}>
              <ArrowScrollIcon />
            </div>
            <div className={`${styles["btn"]} ${styles["btn-position"]}`}>
              <div
                onClick={() =>
                  handleToggleAudio(
                    setAudioOff,
                    audioValueOld,
                    inputValue,
                    setInputValue,
                    audioOff,
                    videoRef
                  )
                }
              >
                {audioOff ? <AudioOffIcon /> : <AudioIcon />}
              </div>
              <input
                type="range"
                className={styles["volumn"]}
                min={10}
                max={100}
                step={10}
                value={inputValue}
                // value={}
                onChange={(e) => {
                  handleChangeVolumn(videoRef, e.target.value, setAudioOff);
                  handleCheckAudio(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {/* --------------------end actions button ------------------- */}
        {/* ------------------processs time------------------------- */}
        <div className={styles["process-time"]}>
          <div className="process" style={{flex: 2}}>
            <input
              type="range"
              className="level"
              onChange={(e) => hiandleChangeTimeVideo(e.target.value, videoRef)}
              min={0}
              value={currentTime}
              max={videoRef.current?.duration}
            />
          </div>
          <p>
            {handleTotalTime(currentTime)}/
            {handleTotalTime(videoRef?.current?.duration)}
          </p>
        </div>
        {/* ------------------end processs time------------------------- */}
      </div>
    </div>
  );
}

export default memo(VideoCard);
