import * as request from '../index';

const addComment = async (data:any) => {
    try{
        const res = await request.post('comment/create' , data );
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
}
const delComment = async (id:string) => {
    try{
        const res = await request.del(`comment/delete/${id}`);
        return res;
    }catch(e){
        console.log("Lỗi thêm bình luận " , e);
        return null;
    }
}
export { addComment , delComment };