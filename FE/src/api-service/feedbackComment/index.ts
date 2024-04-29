import { message } from 'antd';
import * as request from '../index';

const addFeedBackComment = async (data:any) => {
    try{
        const res = await request.post('feed-back-comment/create' , data );
        message.success("bình luận thành công !!", 3);
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
}
const countFeedBackComment = async (id_comment:any) => {
    try{
        const res = await request.get( `feed-back-comment/count/${id_comment}` );
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
}
const getFeedBackComment = async (id_comment:any,limit:Number) => {
    try{
        const res = await request.get(`feed-back-comment/${id_comment}/${limit}`);
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
}
const delFeedBackComment = async (id:string) => {
    try{
        const res = await request.del('')
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
}
export { addFeedBackComment , delFeedBackComment , getFeedBackComment , countFeedBackComment };