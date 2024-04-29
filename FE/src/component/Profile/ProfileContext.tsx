import { createContext, useContext, useEffect, useState } from "react";
import * as UserReq from "../../api-service/user";
import * as VideoReq from "../../api-service/video";
import * as FollowReq from "../../api-service/follow";
import useAuth from "@/hooks/useAuth";

const ProfileContext = createContext({});

function ProfileProvider({ children, idUser }: any) {
  const [data, setData] = useState<any>({});
  const [dataCreator, setDataCreator] = useState<any>([]);
  const [follow, setFollow] = useState<any>({});
  const { user } = useAuth();


  const getFollow = async () => {
    const res = await FollowReq.show(user?.sub, idUser);
    setFollow(res);
  };
  // console.log("[ FOLLOW-FOLLOW ]: ", follow);

  const getDataVideo = async () => {
    if (idUser) {
      const res = await VideoReq.getByUser(idUser);
      setDataCreator(res);
    }
  };

  const getUser = async () => {
    const res = await UserReq.getUserById(idUser);
    setData(res);
  };
  useEffect(() => {
    getDataVideo();
    getUser();
  }, [idUser]);
  useEffect( () => {
    getFollow();
  } , [user] );

  const handleAccept = async () => {
    await FollowReq.accept({  idUserMember:[user?.sub , idUser ] });
    getFollow();
  };
  const handleUnFriends = async () => {
    await FollowReq.unFriends(user?.sub , idUser);
    getFollow();
  };
  const handleFollow = async () => {
    await FollowReq.follow({  idUserMember:[user?.sub , idUser ] , idSender: user?.sub });
    getFollow();
  };
  return (
    <ProfileContext.Provider value={{ data, getUser, dataCreator, idUser , follow , handleAccept , handleFollow , handleUnFriends }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider, ProfileContext };
