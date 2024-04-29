import useAuth from "@/hooks/useAuth";
import * as Notifications from "../../api-service/notifi";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContextNotifi = createContext({});
const GlobalNotifiProvider = ({ children }: any) => {
  const { user } = useAuth();
  const [likesCmt, setLikesCmt] = useState<any>([]);
  const [likeVideos, setLikeVideos] = useState<any>([]);
  const [listFollowers, setFollowers] = useState<any>([]);
  const [likeFeedBack, setLikeFeedBack] = useState<any>([]);
  const [listComments, setListComments] = useState<any>([]);
  const [listCommentsFeedBack, setListCommentsFeedBacks] = useState<any>([]);

  const [listTagsMentioned, setListTagsMentioned] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const idUser = user?.sub;
      const dataComment = await Notifications.getCmtVideo(idUser);
      const dataCommentFeedBack = await Notifications.getCmtFeedBack(idUser);
      const dataLikesCmt = await Notifications.getLikesCmt(idUser);
      const dataLikeVideo = await Notifications.getLikesVideo(idUser);
      const dataLikesCmtFeedBack = await Notifications.getLikeFeedbacks(idUser);
      setLikesCmt(dataLikesCmt);
      setLikeVideos(dataLikeVideo);
      setLikeFeedBack(dataLikesCmtFeedBack);

      setListComments(dataComment);
      setListCommentsFeedBacks(dataCommentFeedBack);
    };
    getData();
  }, [user]);

  return (
    <GlobalContextNotifi.Provider
      value={{
        likesCmt,
        likeFeedBack,
        likeVideos,
        listComments,
        listCommentsFeedBack,
      }}
    >
      {children}
    </GlobalContextNotifi.Provider>
  );
};

export { GlobalContextNotifi, GlobalNotifiProvider };
