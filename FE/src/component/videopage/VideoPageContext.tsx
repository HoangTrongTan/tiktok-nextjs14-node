"use client";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { message } from "antd";
import * as VideoReq from '../../api-service/video';

const VideoPageContext = createContext({});


function VideoPageProvider({ children }: any) {
  const [CurrentVideo, setCurrentVideo] = useState<any>({});
  const [heartCommentCount, setHeartCommentCount] = useState<any>({});
  const [CurrentUser, setCurrentUser] = useState<any>({});
  const [idVideoUser, setIdVideoUser] = useState<any>([]);
  const [isplaying, setIsPlaying] = useState<boolean>(false);
  const [comment, setComment] = useState<any>([]);
  const [newFeedBackComment, setNewFeedBackComment] = useState<any>(0);
  const [ dataCreator,setDataCreator ] = useState<any>([]);
  const videRef = useRef<any>(null);
 
  const getData = async () => {
      if(idVideoUser){
        const res = await VideoReq.getByUser(idVideoUser[1]);
        setDataCreator(res);
      }
  } ;
  useEffect( () => {  
      getData();
  } , [idVideoUser] ); 
  // const []
  const getComment = async () => {
    try {
      if (idVideoUser) {
        const rs = await axios.get(
          `http://localhost:5432/api/comment/${idVideoUser[0]}`
        );
        // console.log("RESPONSE", rs);

        setComment(rs.data);
      }
    } catch (e) {
      message.error("lỗi lấy bình luận ", 3);
      console.log("Lỗi lấy bình luận !!", e);
    }
  };
  useEffect(() => {
    getComment();
  }, [idVideoUser, newFeedBackComment]);
  // ------------Count------
  const getCount = async () => {
    try {
      const rs = await axios.get(
        `http://localhost:5432/api/video/show-actions/one/${idVideoUser[0] ?? ""}`
      );
      setHeartCommentCount(rs.data);
    } catch (e) {
      message.error("lỗi lấy lượt thả tim và bình luận !!", 3);
      console.log("lỗi lấy lượt thả tim và bình luận !!", e);
    }
  };
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5432/api/video/one/${idVideoUser[0] || ""}/${
            idVideoUser[1] || ""
          }`
        );
        setCurrentVideo(res.data.video);
        setCurrentUser(res.data.user);
      } catch (e) {
        // message.error("Lỗi nhận video", 3);
        console.log("Lỗi nhận video", e);
      }
    };
    getVideo();
  }, [idVideoUser, newFeedBackComment]);
  
  useEffect( () => {
    getCount();
  } , [idVideoUser] );

  const ShortenText = useCallback((text: string) => {
    let rs: string;
    if (text.length > 43) {
      rs = text.substring(0, 44) + "...";
      return rs;
    }
    return text;
  }, []);
  const handlePlay = () => {
    if (videRef.current) {
      setIsPlaying(true);
      videRef.current.play();
    }
  };
  const handlePause = () => {
    if (videRef.current) {
      setIsPlaying(false);
      videRef.current.pause();
    }
  };
  const postComment = useCallback(
    async (
      id_user: string,
      id_video: string,
      noidung: string,
      setText: any
    ) => {
      try {
        const rs = await axios.post(
          `http://localhost:5432/api/comment/create`,
          {
            idVideo: id_video,
            idUser: id_user,
            noidung: noidung,
          }
        );
        setText("");
      } catch (e) {
        console.log("Lỗi thêm bình luận !!", e);
        message.info("Lỗi thêm bình luận !!", 3);
      }
    },
    []
  );
  const handleTotalTime = useCallback((time:number) => {
    const a = Math.floor(time / 60);
    const b = Math.floor(time % 60);
    let ch = `0${a}:0${b}`;
    if (b > 9) {
      ch = `0${a}:${b}`;
    }
    return ch;
  }, []);

  return (
    <VideoPageContext.Provider
      value={{
        CurrentVideo,
        ShortenText,
        setIdVideoUser,
        CurrentUser,
        heartCommentCount,
        videRef,
        handlePlay,
        isplaying,
        handlePause,
        comment,
        setComment,
        postComment,
        newFeedBackComment,
        setNewFeedBackComment,
        getCount,
        getComment,
        dataCreator,
        handleTotalTime,
        setIsPlaying
      }}
    >
      {children}
    </VideoPageContext.Provider>
  );
}

export { VideoPageProvider, VideoPageContext };
