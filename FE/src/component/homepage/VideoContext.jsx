import { message } from "antd";
import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ContextVideo = createContext();

const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
 
  
  const handlePlay = useCallback((videoRef, index, setIsPlaying, isPlaying) => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
    setCurrentVideo(index);
  }, []);

  const handleChangeVolumn = useCallback((videoRef, volumn, setAudioOff) => {
    if (videoRef?.current) {
      setAudioOff(false);
      videoRef.current.volume = volumn / 100;
    }
  }, []);

  const handleTotalTime = useCallback((time) => {
    const a = Math.floor(time / 60);
    const b = Math.floor(time % 60);
    let ch = `0${a}:0${b}`;
    if (b > 9) {
      ch = `0${a}:${b}`;
    }
    return ch;
  }, []);
  const handleLikeVideo = useCallback(
    async (id_video, id_user, getCount) => {
      try {
        const res = await axios.put(
          "http://localhost:5432/api/video/increate-like",
          { id_video: id_video, id_user: id_user }
        );
        getCount();
      } catch (e) {
        console.log(">>>lỗi thích video: ", e);
        message.error("lỗi thích video", 3);
      }
    },
    []
  );
  const checkLikesUser = useCallback( (data , id_user) => {
    return data.some( i => i === id_user);
  } , [] );
  const handleToggleAudio = useCallback(
    (
      setAudioOff,
      audioValueOld,
      inputValue,
      setInputValue,
      audioOff,
      videoRef
    ) => {
      if (audioOff) {
        setAudioOff(false);
        videoRef.current.volume = audioValueOld.current / 100;
        setInputValue(audioValueOld.current);
        return;
      }
      audioValueOld.current = inputValue;
      videoRef.current.volume = 0;
      setInputValue(0);
      setAudioOff(true);
    },
    []
  );
  const hiandleChangeTimeVideo = useCallback((value, videoRef) => {
    // videoRef.current.currentTime =
  }, []);
  return (
    <ContextVideo.Provider
      value={{
        handlePlay,
        currentVideo,
        setCurrentVideo,
        handleTotalTime,
        handleChangeVolumn,
        handleToggleAudio,
        hiandleChangeTimeVideo,
        handleLikeVideo,
        checkLikesUser,
      }}
    >
      {children}
    </ContextVideo.Provider>
  );
};

export { ContextVideo, VideoProvider };
