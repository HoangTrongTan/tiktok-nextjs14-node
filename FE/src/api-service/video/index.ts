import * as request from '../index';

const getByUser = async (id_user: any) => {
    try{
        const res = await request.get(`video/show-video/${id_user}/own` );
        return res;
    }catch(e){
        console.log("Lỗi lấy data videos "  , e);
        return null;
    }
}

export { getByUser  };