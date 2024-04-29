import * as request from '../index';

const getLikesCmt = async (idUser:any) => {
    try{
        const res = await request.get(`notifi/likes/${idUser}`);
        return res;
    }catch(e){
        console.log(">>> [Lỗi lấy thông báo lượt thích !!]: ", e);
    }
}
const getLikeFeedbacks = async (idUser:any) => {
    try{
        const res = await request.get(`notifi/likes-feedback/${idUser}`);
        return res;
    }catch(e){
        console.log(">>> [Lỗi lấy thông báo lượt thích phản hồi !!]: ", e);
    }
}
const getLikesVideo = async (idUser:any) => {
    try{
        const res = await request.get(`notifi/likes-video/${idUser}`);
        return res;
    }catch(e){
        console.log(">>> [Lỗi lấy thông báo lượt thích videos !!]: ", e);
    }
}
const getCmtVideo = async(idUser:any) => {
    try{
        const res = await request.get(`notifi/comment/${idUser}`);
        return res;
    }catch(e){
        console.log(">>> [Lỗi lấy thông báo lượt thích videos !!]: ", e);
    }
}
const getCmtFeedBack = async(idUser:any) => {
    try{
        const res = await request.get(`notifi/comment-feedback/${idUser}`);
        return res;
    }catch(e){
        console.log(">>> [Lỗi lấy thông báo lượt thích videos !!]: ", e);
    }
}

export { getLikesCmt , getLikeFeedbacks , getLikesVideo , getCmtVideo , getCmtFeedBack };