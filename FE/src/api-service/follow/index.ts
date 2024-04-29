import { message } from 'antd';
import * as request from '../index';

const follow = async (data:any) => {
    try{
        const res = await request.post('follow/add',data);
        message.info( res.message , 2 );
        return res;
    }catch(e){
        console.log("Lỗi follow" , e);
        return null;
    }
};
const show = async (idUser:any , idFriends:any) => {
    try{
        // console.log("TTTTTTTTTTTTTTTTTTTTTTTT: ", idFriends, "---", idUser);
        // console.log("TTTTTTTTTTTTTTTTTTTTTTTT: ", idFriends, "---", idUser);
        // console.log("TTTTTTTTTTTTTTTTTTTTTTTT: ", idFriends, "---", idUser);
        
        const res = await request.get(`follow/show/${idUser}/${idFriends}`);
        return res;
    }catch(e){
        console.log("Lỗi follow" , e);
        return null;
    }
};
const accept = async (data:any) => {
    try{
        // console.log("SHOWW SHOWW SHOWW: " , id_comment);
        const res = await request.put(`follow/accept` , data);
        message.info( res.message , 4 );
        return res;
    }catch(e){
        console.log("Lỗi follow" , e);
        return null;
    }
};
const unFriends = async (idUser:any , idFriends:any) => {
    try{
        // console.log("SHOWW SHOWW SHOWW: " , id_comment);
        const res = await request.del(`follow/unfollow/${idUser}/${idFriends}`);
        message.info( res.message , 4 );
        return res;
    }catch(e){
        console.log("Lỗi follow" , e);
        return null;
    }
};

const getListFollow = async (idUser:any) => {
    try{
        const res = await request.get(`follow/show-list-friends/${idUser}`);
        return res;
    }catch(e){
        console.log("Lỗi follow" , e);
        return null;
    }
};



export { follow , show , accept , unFriends , getListFollow };