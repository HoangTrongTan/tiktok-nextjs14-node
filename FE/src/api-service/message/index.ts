import * as request from '../index';

const getMessage = async (id:any) => {
    try{
        const res = await request.get(`chat-message/get/${id}`);
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        
        return null;
    }
};

const createMessage = async (data:any) => {
    try{
        const res = await request.post(`chat-message/create`, data);
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
};

const getLikeMessage = async (idMessage:any) => {
    try{
        const res = await request.get(`chat-message/get-like-message/${idMessage}`);
        return res;
    }catch(e){
        console.log("Lỗi thích messgae " , e);
        return null;
    }
};

const postLikeMessage = async (data:any) => {
    try{
        const res = await request.post(`chat-message/like-message`, data);
        return res;
    }catch(e){
        console.log("Lỗi thích messgae " , e);
        return null;
    }
};

const deleteMessage = async (idMessage:any) => {
    try{
        const res = await request.del(`chat-message/delete-like-message/${idMessage}`);
        return res;
    }catch(e){
        console.log("Lỗi thích messgae " , e);
        return null;
    }
};

export { getMessage  , createMessage , getLikeMessage , postLikeMessage , deleteMessage };