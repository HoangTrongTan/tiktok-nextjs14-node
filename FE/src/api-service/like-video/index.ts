import * as request from '../index';

const like = async (data:any) => {
    try{
        const res = await request.put('video/increate-like',data);
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
};
const show = async (id_comment:any) => {
    try{
        // console.log("SHOWW SHOWW SHOWW: " , id_comment);
        
        const res = await request.get(`comment/like-comment/${id_comment}`);
        
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
};

export { like , show };