import * as request from '../index';

const like = async (data:any) => {
    try{
        const res = await request.post('favourites/create-favoutites',data);
        return res;
    }catch(e){
        console.log("Lỗi thêm yêu thích " , e);
        return null;
    }
};
const getVideoById = async (idUser:any) => {
    try{
        const res = await request.get(`favourites/getvideo/${idUser}` );
        return res;
    }catch(e){
        console.log("Lỗi timf video theo id " , e);
        return null;
    }
};

export { like , getVideoById };
