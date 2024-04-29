import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as MessageReq from "../../api-service/message";
import * as FollowReq from "../../api-service/follow";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat, setDataListUser, setDataNewMessage } from "@/redux/storeMess/states/stateChat";
import {  fetchDataSuccess } from "@/redux/storeMess/states/state";
import { io } from 'socket.io-client';
import useAuth from "@/hooks/useAuth";
const MessageContext = createContext({});

const MessageProvider = ({ children }: any) => {
  const [socket,setSocket] = useState<any>(null);
  const [onlineUser,setOnlineUser] = useState<any>(null);

  const { user } = useAuth();
  const dispatch = useDispatch();
  const { chat, message }: any = useSelector(
    (state: any) => state.CombineReducer  
  );
  // -------------------------------start setup socket--------------
  useEffect( () => {
    const newSocket = io("http://localhost:5432");    
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      dispatch(setCurrentChat(null));
    };
  } , [] );
  useEffect(() => {
    if (!socket) return;
    if (!user) return;
    socket.emit("addNewUser", user?.sub);
    socket.on("getOnlineUsers", (onLineUser: any) => {      
      setOnlineUser(onLineUser);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user]);
  // -------------------------------end setup socket--------------
  
  useEffect(() => {
    const getData = async () => {
      if (user) {
        const data: any = await FollowReq.getListFollow(user.sub);
        dispatch(setDataListUser(data));
      }
    };
    getData();
  }, [user]);
  const getMessage = async () => {
    const data = await MessageReq.getMessage(chat.curentChat?._id);
    dispatch(fetchDataSuccess(data));
  };

  useEffect(() => {
    getMessage();
  }, [chat.curentChat , chat.newMessage]);

  // ---------------SOCKET==============
  useEffect( () => {
    if(!socket) return;
    socket.on("getMessage" , (message:any) =>{
      console.log("GET GET MESSGAE");
      
      getMessage();
    } );
    return () => {
      socket.off("getMessage");
    }
  } , [socket,chat.curentChat] )

  useEffect( () => {
    
  } , [message.newMessage] );
  // ---------------SOCKET==============
  console.log("CURENT CHAT: ", chat?.curentChat , onlineUser, socket);
  
  const handleSetCurrentChat = useCallback( (setCurrentChat:any, data:any) => {
      if(data){
        dispatch(setCurrentChat(data));
      }
  } , [] );

  const handleSendText =  async (objMessage:any , setText:any ) => {
    setText("");
    await MessageReq.createMessage(objMessage);
    dispatch(setDataNewMessage(objMessage));
    if(onlineUser){
      const receiptId = chat?.curentChat?.idUserMember?.find( (i:any) => i !== user?.sub );
      socket.emit("sendMessage" , {objMessage,receiptId, socketId: socket?.id});
    }
  } ;
  return (
    <MessageContext.Provider value={{ chat, message, user , handleSetCurrentChat , handleSendText , getMessage , socket }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
